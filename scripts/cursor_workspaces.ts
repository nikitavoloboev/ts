async function commandsToRun(
  functions: { func: (...args: any[]) => void; args: any[] }[],
) {
  for (const { func, args } of functions) {
    func(...args)
  }
}

function workspaces(animal: string) {
  console.log("workspaces")
}

function testing() {
  console.log("testing")
}

const dog = "dog"

// await commandsToRun([workspaces(dog), testing])
await commandsToRun([
  { func: workspaces, args: [dog] },
  { func: testing, args: [] },
])

// async function main() {
//   const args = Bun.argv
//   const command = args[2]
//   try {
//     switch (command) {
//       case "testing":
//         testing()
//         break
//       case undefined:
//         workspaces()
//         break
//     }
//   } catch (err) {
//     console.error("Error:", err)
//   }
// }
// main()
