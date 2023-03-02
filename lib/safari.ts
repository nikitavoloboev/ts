import { execa } from "execa"

// TODO: need https://github.com/dsherret/dax but for bun..
// https://github.com/google/zx can't import
// https://github.com/sindresorhus/execa not nice DX but can't do below string with "" to work using it
// Return URL of current tab in Safari
export async function getSafariUrl() {
  // const { stdout } = await execa("osascript", ['-e'], '')
  // return await $` -e 'tell application "Safari" to return URL of front document'`
}
