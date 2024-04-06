import { getCurrentMonth, getCurrentMonthAndDay } from "@nikiv/ts-utils"

const args = Bun.argv

console.log(main())
function main() {
  switch (args[2]) {
    case "month":
      return getCurrentMonth()
    case "month-with-number":
      return getCurrentMonthAndDay()
    default:
      break
  }
}
