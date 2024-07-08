import {
  writeContentToDesktopFile,
  getClipboard,
  isValidBase64,
} from "@nikiv/ts-utils"

// takes a base64 string from clipboard and writes it to a file
// by default its `~/Desktop/base64-decoded.png`
async function main() {
  const clipboardContent = getClipboard()

  if (!isValidBase64(clipboardContent)) {
    console.error("Clipboard content is not a valid base64 string.")
    return
  }

  const buffer = Buffer.from(clipboardContent, "base64")
  writeContentToDesktopFile(buffer, "base64-decoded.png")
}

main()
