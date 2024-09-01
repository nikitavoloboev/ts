async function main() {
  const args = Bun.argv
  const filePath = args[2]
  if (!filePath) throw new Error("File path is required")
  const filePathWithGitProject = await getGitProjectOfPath(filePath)
  return filePathWithGitProject
}

async function getGitProjectOfPath(filePath: string) {
  const path = require("path")
  const fs = require("fs").promises
  let currentPath = path.resolve(filePath)
  while (currentPath !== "/") {
    const gitPath = path.join(currentPath, ".git")
    try {
      await fs.access(gitPath)
      // if we reach here, .git folder exists
      return currentPath
    } catch (error) {
      // .git folder doesn't exist, move up to parent directory
      currentPath = path.dirname(currentPath)
    }
  }
  // if we've reached the root without finding a .git folder
  throw new Error("No Git repository found in the path or its parents")
}

console.log(await main())
