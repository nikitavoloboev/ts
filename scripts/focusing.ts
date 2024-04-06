import { readConfigFileValue } from "@nikiv/ts-utils"

console.log(await focusing())

// true = time to focus
// false = can take break
async function focusing() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const forcedBreakTimeEndString = await readConfigFileValue(
    ".focus",
    "forcedBreakTimeEnd",
  )
  if (forcedBreakTimeEndString === null) {
    throw new Error("forcedBreakTimeEnd is not defined in the config file")
  }
  const forcedBreakTimeEnd = new Date(forcedBreakTimeEndString)

  // Check if current time is within the forced break time end
  if (now.getTime() <= forcedBreakTimeEnd.getTime()) {
    return false
  }

  // check if current time is within the specified break intervals
  if (
    (hours === 10 && minutes >= 30 && minutes <= 50) ||
    (hours === 12 && minutes >= 30 && minutes <= 50) ||
    (hours === 14 && minutes >= 30 && minutes <= 50) ||
    (hours === 16 && minutes >= 30 && minutes <= 50) ||
    (hours === 18 && minutes >= 30 && minutes <= 50) ||
    (hours === 20 && minutes >= 30 && minutes <= 50)
  ) {
    return false
  }

  return true
}
