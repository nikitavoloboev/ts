import { Option } from "@swan-io/boxed"

async function main() {
  const aName = Option.Some("John")
  const bName = Option.None()
  console.log(aName)
}

await main()

// -- past
