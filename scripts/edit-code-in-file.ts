import { readFileSync, writeFileSync } from "fs"

// TODO: doesn't work, should given some code and a path
// comment it out with `//`
// or uncomment by deleting `//`
// to be used with code-workspaces and zed editor in my case
// make this generic though
// perhaps https://github.com/jqlang/jq should be used as code-workspace is jsonc format
// alternatively can try make zed treat code-workspace file extension as jsonc, then comment would work (better solution)
async function main() {
  try {
    const args = Bun.argv
    const filePath = args[2]
    const selectedCode = args[3]

    if (!filePath) throw new Error("No file path provided")
    if (!selectedCode) throw new Error("No selected code provided")

    // Read the file
    let fileContent = readFileSync(filePath, "utf-8")

    // Prepare the selected code for regex by escaping special characters
    const escapedSelectedCode = selectedCode.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    )

    // Create a regex pattern to match the selected code
    const regex = new RegExp(`(\\s*)(${escapedSelectedCode})`, "g")

    // Replace the matched content with commented version
    const commentedContent = fileContent.replace(
      regex,
      (match, indent, content) => {
        return (
          content
            .split("\n")
            // @ts-ignore
            .map((line) => `${indent}//${line.trim()}`)
            .join("\n")
        )
      },
    )

    // Write the updated content back to the file
    writeFileSync(filePath, commentedContent, "utf-8")

    console.log("File updated successfully")
  } catch (err) {
    console.error(err)
  }
}

await main()
