import clipboard from "clipboardy"

export function getClipboard() {
  return clipboard.readSync()
}

export function appendToClipboard(
  newClipboard: string | object | Array<unknown>,
) {
  if (typeof newClipboard === "object" || Array.isArray(newClipboard)) {
    clipboard.writeSync(JSON.stringify(newClipboard))
    return
  }
  clipboard.writeSync(newClipboard)
}
