import { getCurrentSafariTechPreviewUrlAndTitle } from "@nikiv/ts-utils"
import { test } from "bun:test"

test("Scripts", async () => {
  const res = await getCurrentSafariTechPreviewUrlAndTitle()
  console.log(res)
  // expect().toEqual(expectedOutput)
})
