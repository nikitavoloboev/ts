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

    // Check if SSH agent is already running
    console.log("Checking for existing SSH agent...")
    let sshAgentPid: string | undefined
    try {
      sshAgentPid = process.env.SSH_AGENT_PID
      if (sshAgentPid) {
        console.log("Existing SSH agent found.")
      } else {
        console.log("Starting new SSH agent...")
        const sshAgentResult = await $`ssh-agent -s`
        const sshAgentOutput = sshAgentResult.stdout.toString().trim()

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

        console.log("New SSH agent started successfully")
      }

      // Check if any identities are already added
      console.log("Checking for existing identities...")
      try {
        const listResult = await $`ssh-add -l`
        console.log("Identities already present in the agent.")
      } catch (error: any) {
        if (error.stdout.includes("The agent has no identities.")) {
          console.log(
            "No identities found in the agent. Adding default identity...",
          )
          // Add the SSH key with passphrase
          await $`ssh-add ~/.ssh/id_rsa` // This will prompt for the passphrase once
        } else {
          throw error
        }
      }
    } catch (error) {
      console.error("Error with SSH agent:", error)
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
