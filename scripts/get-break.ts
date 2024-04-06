import { readConfigFileValue, updateConfigFile } from "@nikiv/ts-utils"

const dailyBreaksAllowed = await readConfigFileValue(
  ".focus",
  "dailyBreaksAllowed",
)
if (Number(dailyBreaksAllowed) > 0) {
  const forcedBreakTimeEnd = new Date()
  forcedBreakTimeEnd.setUTCMinutes(forcedBreakTimeEnd.getUTCMinutes() + 5)
  const forcedBreakTimeEndString = forcedBreakTimeEnd.toISOString()
  await updateConfigFile(
    ".focus",
    "forcedBreakTimeEnd",
    forcedBreakTimeEndString,
  )
  const updatedBreaksAllowed = (Number(dailyBreaksAllowed) - 1).toString()
  await updateConfigFile(".focus", "dailyBreaksAllowed", updatedBreaksAllowed)
} else {
  throw new Error("no breaks allowed")
}
