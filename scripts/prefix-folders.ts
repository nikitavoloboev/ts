import { $ } from "bun"
import path from "path"

async function main() {
  const args = Bun.argv
  const folderPath = path.resolve(args[2] ?? "")
  if (!folderPath) throw new Error("folderPath is required")
  const prefix = args[3]
  if (!prefix) throw new Error("prefix is required")

  try {
    const { stdout } = await $`ls -d ${folderPath}/*/`
    const directories = stdout.toString().trim().split("\n")

    for (const dir of directories) {
      const trimmedDir = path.basename(dir.replace(/\/$/, ""))

      if (trimmedDir === "private") {
        console.log(`Skipping 'private' folder`)
      } else if (trimmedDir.startsWith(prefix)) {
        console.log(`Skipping ${trimmedDir} as it already has the prefix`)
      } else {
        const newName = `${prefix}${trimmedDir}`
        const fullOldPath = path.join(folderPath, trimmedDir)
        const fullNewPath = path.join(folderPath, newName)

        console.log(`Renaming ${trimmedDir} to ${newName}`)
        await $`mv ${fullOldPath} ${fullNewPath}`
      }
    }

    console.log("Renaming complete!")
  } catch (error) {
    console.error("An error occurred:", error)
  }
}

await main()
