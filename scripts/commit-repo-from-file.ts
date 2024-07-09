import {
  commitRepoWithDot,
  findGitDirPath,
  getClipboard,
} from "@nikiv/ts-utils"

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
