const args = Bun.argv
const timezone = args[2]

if (timezone) {
  console.log(getCurrentTime(timezone))
}

// TODO: add more timezones
// timezone type should be: "sf" | "all"
function getCurrentTime(timezone: string) {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }
  const formatter = new Intl.DateTimeFormat("en-US", options)
  return `SF: ${formatter.format(date)}`
}
