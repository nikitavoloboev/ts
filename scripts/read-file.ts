const args = Bun.argv
const filePath = args[2]

if (filePath) {
  console.log(await readFile(filePath))
}

function readFile(filePath: string) {
  try {
    const data = Bun.file(filePath).text()
    return data
  } catch (error) {
    console.error("Failed to read file:", error)
    return null
  }
}
