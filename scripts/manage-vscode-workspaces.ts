const args = Bun.argv
const path = args[2]

if (path) {
  console.log(`Opening ${path}`)
}

function manageVSCodeWorkspaces(path: string) {}
