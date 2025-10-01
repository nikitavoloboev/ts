import { object, or } from "@optique/core/constructs"
import { message } from "@optique/core/message"
import type { InferValue } from "@optique/core/parser"
import { argument, command, constant, option } from "@optique/core/primitives"
import { run } from "@optique/run"
import { string } from "@optique/core/valueparser"
import { promises as fs } from "node:fs"
import path from "node:path"
import process from "node:process"
import { optional } from "@optique/core/modifiers"
import os from "node:os"
import { spawn } from "node:child_process"

const VERSION = "0.1"
const PROGRAM_NAME = "flow-ts"
const TAGLINE = "CLI to do things fast"
const DEFAULT_EMAIL_TEMPLATE_PATH = path.join(
  os.homedir(),
  ".config",
  "friendik",
  "email",
  "send.md"
)
const DEFAULT_EMAIL_TEMPLATE_DISPLAY = formatHomeRelative(
  DEFAULT_EMAIL_TEMPLATE_PATH
)

const clearGhNotifsCommand = command(
  "clearGhNotifs",
  object({
    action: constant("clearGhNotifs"),
  })
)

const sendEmailCommand = command(
  "sendEmail",
  object({
    action: constant("sendEmail"),
    from: optional(
      option("--from", string(), {
        description: message`Email sender (e.g. "team@example.com")`,
      })
    ),
    to: optional(
      option("--to", string(), {
        description: message`Comma-separated recipients or single email address`,
      })
    ),
    subject: optional(
      option("--subject", string(), {
        description: message`Optional email subject override`,
      })
    ),
    content: optional(
      option("--content", "--file", string(), {
        description: message`Path to the Markdown file with email content (default: ${DEFAULT_EMAIL_TEMPLATE_DISPLAY})`,
      })
    ),
  })
)

const cloneCommand = command(
  "clone",
  object({
    action: constant("clone"),
    url: argument(string(), {
      description: message`Repository URL to clone`,
    }),
  })
)

const cli = or(clearGhNotifsCommand, sendEmailCommand, cloneCommand)

type TsCommand = InferValue<typeof cli>

type SendEmailCommand = Extract<TsCommand, { action: "sendEmail" }>
type CloneCommand = Extract<TsCommand, { action: "clone" }>

async function execute(command: TsCommand) {
  switch (command.action) {
    case "clearGhNotifs": {
      console.log("Pretending to clear GitHub notifications...")
      break
    }
    case "sendEmail": {
      await sendEmail(command)
      break
    }
    case "clone": {
      await cloneRepository(command)
      break
    }
  }
}

async function cloneRepository(command: CloneCommand) {
  const repositoryUrl = command.url.trim()
  if (repositoryUrl.length === 0) {
    throw new Error("Repository URL is required.")
  }

  const { namespaceSegments, repoName } = parseRepositoryLocation(repositoryUrl)

  const homeDirectory = os.homedir()
  if (!homeDirectory) {
    throw new Error("Unable to determine the current user's home directory.")
  }

  const namespaceDirectory = path.join(
    homeDirectory,
    "gh",
    ...namespaceSegments
  )
  const targetDirectory = path.join(namespaceDirectory, repoName)

  if (await pathExists(targetDirectory)) {
    throw new Error(
      `Destination already exists: ${formatDisplayPath(targetDirectory)}`
    )
  }

  await fs.mkdir(namespaceDirectory, { recursive: true })

  await runGitClone(repositoryUrl, targetDirectory)

  console.log(`Repository ready at ${formatDisplayPath(targetDirectory)}`)
}

function parseRepositoryLocation(rawUrl: string) {
  let pathPart: string | undefined

  try {
    const parsed = new URL(rawUrl)
    pathPart = parsed.pathname
  } catch {
    const scpLikeMatch = rawUrl.match(/^[^@]+@([^:]+):(.+)$/)
    if (scpLikeMatch) {
      pathPart = scpLikeMatch[2]
    }
  }

  if (!pathPart) {
    throw new Error(`Unsupported repository URL: ${rawUrl}`)
  }

  const normalizedPath = pathPart
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/\\+/g, "/")

  const withoutGitSuffix = normalizedPath.replace(/\.git$/i, "")
  const segments = withoutGitSuffix
    .split("/")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)

  if (segments.length < 2) {
    throw new Error(
      `Repository reference must include an organization and name: ${rawUrl}`
    )
  }

  if (segments.some((segment) => segment === "." || segment === "..")) {
    throw new Error(`Repository URL contains invalid path segments: ${rawUrl}`)
  }

  const repoNameCandidate = segments[segments.length - 1]
  if (!repoNameCandidate) {
    throw new Error(`Unable to determine repository name from: ${rawUrl}`)
  }

  const repoName = repoNameCandidate
  const namespaceSegments = segments.slice(0, -1)

  return { namespaceSegments, repoName }
}

async function pathExists(candidatePath: string) {
  try {
    await fs.access(candidatePath)
    return true
  } catch {
    return false
  }
}

async function runGitClone(repositoryUrl: string, destination: string) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn("git", ["clone", repositoryUrl, destination], {
      stdio: "inherit",
    })

    child.on("error", (error) => {
      reject(error)
    })

    child.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`git clone exited with code ${code}`))
      }
    })
  })
}

async function sendEmail(command: SendEmailCommand) {
  const apiKey = requireEnv("RESEND_API_KEY")

  const templatePathInput =
    command.content ?? process.env.RESEND_CONTENT ?? DEFAULT_EMAIL_TEMPLATE_PATH
  const absoluteContentPath = path.isAbsolute(templatePathInput)
    ? templatePathInput
    : path.resolve(process.cwd(), templatePathInput)
  const displayContentPath = formatDisplayPath(absoluteContentPath)

  const markdown = await readMarkdown(absoluteContentPath)
  const template = parseEmailTemplate(markdown)

  const from = resolveSender(
    [command.from, process.env.RESEND_FROM, template.metadata.from],
    displayContentPath
  )

  const to = resolveRecipients(
    [command.to, process.env.RESEND_TO, template.metadata.to],
    "--to",
    displayContentPath
  )

  const cc = resolveOptionalRecipients([
    template.metadata.cc,
    process.env.RESEND_CC,
  ])

  const bcc = resolveOptionalRecipients([
    template.metadata.bcc,
    process.env.RESEND_BCC,
  ])

  const replyTo = resolveOptionalSender([
    template.metadata.replyTo,
    process.env.RESEND_REPLY_TO,
  ])

  const subject = deriveSubject(
    command.subject ?? process.env.RESEND_SUBJECT ?? template.metadata.subject,
    template.body,
    displayContentPath
  )

  const payload: {
    from: string
    to: string | string[]
    subject: string
    text: string
    cc?: string | string[]
    bcc?: string | string[]
    reply_to?: string
  } = {
    from,
    to,
    subject,
    text: template.body,
  }

  if (cc) payload.cc = cc
  if (bcc) payload.bcc = bcc
  if (replyTo) payload.reply_to = replyTo

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const responseText = await response.text()
  let responseJson: unknown
  try {
    responseJson = responseText ? JSON.parse(responseText) : undefined
  } catch (error) {
    responseJson = responseText
  }

  if (!response.ok) {
    const details =
      typeof responseJson === "string"
        ? responseJson
        : JSON.stringify(responseJson, null, 2)
    throw new Error(`Resend API error (${response.status}): ${details}`)
  }

  const emailId =
    typeof responseJson === "object" &&
    responseJson != null &&
    "id" in responseJson
      ? (responseJson as { id: string }).id
      : undefined

  if (emailId) {
    console.log(`Email sent successfully (id: ${emailId}).`)
  } else {
    console.log("Email sent successfully.")
  }
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Environment variable ${name} is required.`)
  }
  return value
}

async function readMarkdown(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8")
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(`Markdown file not found: ${formatDisplayPath(filePath)}`)
    }
    throw new Error(
      `Unable to read Markdown file (${formatDisplayPath(filePath)}): ${
        (error as Error).message
      }`
    )
  }
}

function deriveSubject(
  explicitSubject: string | undefined,
  markdown: string,
  filePath: string
) {
  if (explicitSubject?.trim()) {
    return explicitSubject.trim()
  }

  const headingMatch = markdown.match(/^#\s+(.+)$/m)
  if (headingMatch && headingMatch[1]) {
    return headingMatch[1].trim()
  }

  const fallback = path.basename(filePath, path.extname(filePath))
  if (fallback) {
    return fallback
  }

  throw new Error(
    "Could not determine an email subject. Provide --subject or add a top-level heading to the Markdown file."
  )
}

function normalizeAddressInput(input: string | readonly string[] | undefined) {
  if (input == null) {
    return undefined
  }

  const values =
    typeof input === "string" ? input.split(",") : Array.from(input)
  const recipients = values
    .map((value: string) => value.trim())
    .filter((value): value is string => value.length > 0)

  if (recipients.length === 0) {
    return undefined
  }

  return recipients.length === 1 ? recipients[0] : recipients
}

function resolveRecipients(
  sources: readonly (string | readonly string[] | undefined)[],
  flag: string,
  filePath: string
) {
  for (const source of sources) {
    const normalized = normalizeAddressInput(source)
    if (normalized) {
      return normalized
    }
  }

  throw new Error(
    `No recipients provided. Use ${flag}, set RESEND_TO, or add a 'to' entry in ${filePath}.`
  )
}

function resolveOptionalRecipients(
  sources: readonly (string | readonly string[] | undefined)[]
) {
  for (const source of sources) {
    const normalized = normalizeAddressInput(source)
    if (normalized) {
      return normalized
    }
  }
  return undefined
}

function resolveSender(
  sources: readonly (string | undefined)[],
  filePath: string
) {
  for (const source of sources) {
    const normalized = source?.trim()
    if (normalized) {
      return normalized
    }
  }

  throw new Error(
    `Missing sender. Provide --from, set RESEND_FROM, or add a 'from' entry in ${filePath}.`
  )
}

function resolveOptionalSender(sources: readonly (string | undefined)[]) {
  for (const source of sources) {
    const normalized = source?.trim()
    if (normalized) {
      return normalized
    }
  }
  return undefined
}

interface EmailTemplateMetadata {
  from?: string
  to?: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject?: string
  replyTo?: string
}

interface EmailTemplate {
  metadata: EmailTemplateMetadata
  body: string
}

function parseEmailTemplate(markdown: string): EmailTemplate {
  const frontMatterMatch = markdown.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
  )

  if (!frontMatterMatch) {
    return {
      metadata: {},
      body: markdown.trimStart(),
    }
  }

  const frontMatterRaw = frontMatterMatch[1] ?? ""
  const body = markdown.slice(frontMatterMatch[0].length).trimStart()
  const metadata = parseFrontMatter(frontMatterRaw)

  return {
    metadata,
    body,
  }
}

function parseFrontMatter(source: string): EmailTemplateMetadata {
  const lines = source.split(/\r?\n/)
  const data: Record<string, string | string[]> = {}
  let currentKey: string | undefined

  for (const line of lines) {
    if (!line.trim()) {
      currentKey = undefined
      continue
    }

    if (line.trimStart().startsWith("#")) {
      continue
    }

    const listItemMatch = line.match(/^\s*-\s*(.+)$/)
    if (listItemMatch && currentKey) {
      const listItemValue = listItemMatch[1]
      if (listItemValue == null) {
        continue
      }

      const value = unquote(listItemValue.trim())
      const existing = data[currentKey]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else if (existing == null) {
        data[currentKey] = [value]
      } else {
        data[currentKey] = [existing, value]
      }
      continue
    }

    const keyValueMatch = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!keyValueMatch) {
      currentKey = undefined
      continue
    }

    const rawKey = keyValueMatch[1]
    const rawValue = keyValueMatch[2] ?? ""
    if (rawKey == null) {
      currentKey = undefined
      continue
    }

    const key = rawKey.trim().toLowerCase()
    const value = rawValue.trim()

    if (!value) {
      data[key] = []
      currentKey = key
      continue
    }

    data[key] = unquote(value)
    currentKey = undefined
  }

  return {
    from: coerceString(data["from"]),
    to: coerceRecipients(data["to"]),
    cc: coerceRecipients(data["cc"]),
    bcc: coerceRecipients(data["bcc"]),
    subject: coerceString(data["subject"]),
    replyTo:
      coerceString(data["replyto"]) ??
      coerceString(data["reply_to"]) ??
      coerceString(data["reply-to"]),
  }
}

function coerceString(value: string | string[] | undefined) {
  if (value == null) {
    return undefined
  }
  const candidate = Array.isArray(value) ? value[0] : value
  if (candidate == null) {
    return undefined
  }
  const trimmed = candidate.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function coerceRecipients(value: string | string[] | undefined) {
  if (value == null) {
    return undefined
  }

  if (Array.isArray(value)) {
    const entries = value
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
    return entries.length > 0 ? entries : undefined
  }

  return value
}

function unquote(value: string) {
  if (value.length >= 2) {
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      return value.slice(1, -1)
    }
  }
  return value
}

function formatDisplayPath(filePath: string) {
  const relative = path.relative(process.cwd(), filePath)
  if (relative && !relative.startsWith("..")) {
    return relative
  }
  return filePath
}

function formatHomeRelative(filePath: string) {
  const home = os.homedir()
  if (!home) {
    return filePath
  }
  if (filePath === home) {
    return "~"
  }
  if (filePath.startsWith(`${home}${path.sep}`)) {
    return `~${path.sep}${filePath.slice(home.length + 1)}`
  }
  return filePath
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 1 && (args[0] === "--version" || args[0] === "-v")) {
    console.log(VERSION)
    return
  }

  if (args.length === 0) {
    printTopLevelHelp()
    return
  }

  const parsed = run(cli, {
    programName: PROGRAM_NAME,
    help: "both",
    brief: message`${TAGLINE}`,
  })

  await execute(parsed)
}

function printTopLevelHelp() {
  console.log(`${PROGRAM_NAME} ${VERSION}`)
  console.log(`${TAGLINE}\n`)
  console.log("Commands:")
  console.log("  clearGhNotifs   Clear GitHub notifications (placeholder)")
  console.log(
    `  sendEmail       Send email through Resend using Markdown templates (default: ${DEFAULT_EMAIL_TEMPLATE_DISPLAY})`
  )
  console.log("  clone           Clone a repo into ~/gh/<namespace>/<repo>\n")
  console.log("Flags:")
  console.log("  --version, -v   Show CLI version")
  console.log("  --help          Show command-specific help")
  console.log("\nExamples:")
  console.log(`  ${PROGRAM_NAME} sendEmail --help`)
  console.log(`  ${PROGRAM_NAME} clone git@github.com:user/repo.git`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
