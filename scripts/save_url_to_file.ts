import { getCurrentSafariUrlAndTitle } from "@nikiv/ts-utils"

const args = Bun.argv

// TODO:
async function main() {
  const { url } = await getCurrentSafariUrlAndTitle()
  if (!url) throw new Error("URL not found")
  const filePath = args[2]
  if (!filePath) throw new Error("File path not found")

  // await appendObjectToJsonArrayFile(filePath, { url })
}
await main()
