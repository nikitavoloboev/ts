import { $ } from "bun"

async function main() {
  try {
    const sourceDir = "~/Downloads"
    const destDir = "~/past/private/downloads"

    // ensure the destination directory exists
    await $`mkdir -p ${destDir}`

    // move files
    const result = await $`mv ${sourceDir}/* ${destDir}`

    if (result.exitCode === 0) {
      console.log("All files moved successfully.")
    } else {
      console.error("Error moving files:", result.stderr)
    }
  } catch (error) {
    console.error("An error occurred:", error)
  }
}

await main()
