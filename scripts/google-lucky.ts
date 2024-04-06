import { getClipboard } from "@nikiv/ts-utils/src/clipboard.js"
import open from "open"

async function getFinalUrl(url: string) {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    mode: "no-cors",
  })

  return response.url
}

const initialUrl = `http://www.google.com/search?q=${encodeURIComponent(
  getClipboard(),
)}&btnI`
getFinalUrl(initialUrl).then(async (redirectUrl) => {
  if (redirectUrl) {
    const urlObj = new URL(redirectUrl)
    const finalUrl = urlObj.searchParams.get("q")
    if (
      finalUrl &&
      (finalUrl.startsWith("http://") || finalUrl.startsWith("https://"))
    ) {
      await open(finalUrl)
    }
  }
})
