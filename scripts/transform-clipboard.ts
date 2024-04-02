import { appendToClipboard, getClipboard } from "../packages/util/clipboard.js"

async function transformClipboard() {
  const args = Bun.argv
  const command = args[2]
  const clipboard = await getClipboard()
  const clean = cleanTimestampsFromCloudflareLogs(clipboard)

  switch (command) {
    case "clean-timestamps-from-cloudflare-logs":
      await appendToClipboard(clean)
      break
    case "clean-timestamps-from-cloudflare-logs-for-gpt": {
      const formattedClean = `These are build logs from Cloudflare Pages.\n\n${clean}\n\nFix it.`
      await appendToClipboard(formattedClean)
      break
    }
    case undefined:
      console.log("No command provided")
      break
    default:
      console.log("Unknown command")
      break
  }
}

transformClipboard()

function cleanTimestampsFromCloudflareLogs(text: string) {
  // Regular expression to match timestamps at the beginning of each line
  const timestampRegex = /^\d{2}:\d{2}:\d{2}\.\d{3}\s+/gm
  // Replace timestamps with an empty string
  return text.replace(timestampRegex, "")
}
