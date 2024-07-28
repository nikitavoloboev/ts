import {
  commitRepoWithDot,
  findGitDirPath,
  getClipboard,
} from "@nikiv/ts-utils"

const args = Bun.argv
const option = args[2]

if (option) {
}

// assumes clipboard has file path that is inside some .git folder
async function main() {
  const clipboardContent = getClipboard()

  if (!clipboardContent.startsWith("/Users/")) {
    throw new Error("Clipboard content is not a valid macOS file path.")
  }

  const gitDir = findGitDirPath(clipboardContent)
  await commitRepoWithDot(gitDir)
}

main()

// TODO: below todo, no longer applicable I think
// TODO: always prompts for pass, annoying, not sure how to make it not ask for pass
// there is attempt to do it below with ssh but that is failing even more

// TODO: below code is attempt to make it work with ssh and not ask for pass, failing..

// import {
//   commitRepoWithDot,
//   findGitDirPath,
//   getClipboard,
// } from "@nikiv/ts-utils"
// import { $ } from "bun"

// // assumes clipboard has file path that is inside some .git folder
// async function main() {
//   try {
//     // const clipboardContent = getClipboard()
//     const clipboardContent = "/Users/nikiv/private/test.md"
//     // const clipboardContent =
//     //   "/Users/nikiv/src/ts/scripts/commit-repo-from-file-path-in-clipboard.ts"

//     if (!clipboardContent.startsWith("/Users/")) {
//       throw new Error("Clipboard content is not a valid macOS file path.")
//     }

//     const gitDir = findGitDirPath(clipboardContent)

//     // Ensure 1Password SSH agent is being used
//     if (!process.env.SSH_AUTH_SOCK || !process.env.SSH_AGENT_PID) {
//       throw new Error(
//         "1Password SSH agent is not running or not configured correctly.",
//       )
//     }

//     console.log("Using 1Password SSH agent...")

//     // Check if any identities are already added
//     console.log("Checking for existing identities...")
//     try {
//       const listResult = await $`ssh-add -l`
//       console.log("Identities already present in the agent.")
//     } catch (error: any) {
//       if (error.stdout.includes("The agent has no identities.")) {
//         console.log(
//           "No identities found in the agent. Adding default identity...",
//         )
//         // Add the SSH key with passphrase
//         await $`ssh-add ~/.ssh/id_rsa` // This will prompt for the passphrase once
//       } else {
//         throw error
//       }
//     }

//     try {
//       await commitRepoWithDot(gitDir)
//     } finally {
//       // No need to clean up 1Password SSH agent
//       console.log("1Password SSH agent will continue running.")
//     }
//   } catch (err) {
//     console.log(err, "err")
//   }
// }

// main()
