async function main() {
  try {
    const args = Bun.argv
    const filePath = args[2]
    if (!filePath) throw new Error("No file path provided")
  } catch (err) {
    console.log(err)
  }
}

await main()
