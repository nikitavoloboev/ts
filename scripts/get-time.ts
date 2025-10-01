async function main() {
  const args = Bun.argv
  const timezone = args[2]
  if (timezone) {
    console.log(getCurrentTime(timezone))
  }
}

function getCurrentTime(timezone: string) {
  const timezoneMap: { [key: string]: string } = {
    "GMT-8": "America/Los_Angeles",
  }

  const ianaTimezone = timezoneMap[timezone] || timezone

  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone: ianaTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }
  const formatter = new Intl.DateTimeFormat("en-US", options)
  return formatter.format(date)
}

await main()
