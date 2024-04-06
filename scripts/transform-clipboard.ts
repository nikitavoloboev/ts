import { appendToClipboard, getClipboard } from "@nikiv/ts-utils"

async function transformClipboard() {
  const args = Bun.argv
  const command = args[2]
  const clipboard = await getClipboard()

  switch (command) {
    case "clean-timestamps-from-cloudflare-logs": {
      const cloudFlareLogsWithoutTimestamps =
        cleanTimestampsFromCloudflareLogs(clipboard)
      await appendToClipboard(cloudFlareLogsWithoutTimestamps)
      break
    }
    case "clean-timestamps-from-cloudflare-logs-for-gpt": {
      const cloudFlareLogsWithoutTimestamps =
        cleanTimestampsFromCloudflareLogs(clipboard)
      const instructionsToFix = `These are build logs from Cloudflare Pages.\n\n${cloudFlareLogsWithoutTimestamps}\n\nFix it.`
      await appendToClipboard(instructionsToFix)
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
