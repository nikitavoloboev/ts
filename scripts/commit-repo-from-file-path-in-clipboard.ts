import {
  commitRepoWithDot,
  findGitDirPath,
  getClipboard,
} from "@nikiv/ts-utils"
import { $ } from "bun"

// assumes clipboard has file path that is inside some .git folder
async function main() {
  try {
    // const clipboardContent = getClipboard()
    // const clipboardContent = "/Users/nikiv/private/test.md"
    const clipboardContent =
      "/Users/nikiv/src/ts/scripts/commit-repo-from-file-path-in-clipboard.ts"

    if (!clipboardContent.startsWith("/Users/")) {
      throw new Error("Clipboard content is not a valid macOS file path.")
    }

    const gitDir = findGitDirPath(clipboardContent)

    // Start SSH agent and get its environment variables
    console.log("Starting SSH agent...")
    let sshAgentOutput: string
    try {
      const sshAgentResult = await $`ssh-agent -s`
      sshAgentOutput = sshAgentResult.stdout.toString().trim()

      const envVars = sshAgentOutput.split(";").reduce(
        (acc, line) => {
          const [key, value] = line.split("=")
          if (key && value) {
            acc[key.trim()] = value.trim()
          }
          return acc
        },
        {} as Record<string, string>,
      )

      process.env.SSH_AUTH_SOCK = envVars.SSH_AUTH_SOCK
      process.env.SSH_AGENT_PID = envVars.SSH_AGENT_PID

      console.log("SSH agent started successfully")
    } catch (error) {
      console.error("Error starting SSH agent:", error)
      throw error
    }

    // Add SSH key
    try {
      await $`ssh-add`
    } catch (error) {
      console.error("Error adding SSH key:", error)
      throw error
    }

    try {
      await commitRepoWithDot(gitDir)
    } finally {
      // Clean up SSH agent
      await $`ssh-agent -k`
    }
  } catch (err) {
    console.log(err, "err")
  }
}

main()
