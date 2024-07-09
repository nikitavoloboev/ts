import { $ } from "bun"
import Watcher from "watcher"

async function main() {
  const args = Bun.argv
  const command = args[2]

  switch (command) {
    case "run":
      const currentFilePath = import.meta.url.replace("file://", "")
      const currentFolder = `${currentFilePath.replace("cmd.ts", "")}`
      const watcher = new Watcher(currentFolder, { recursive: true })
      watcher.on("change", async (event) => {
        if (event.endsWith(".ts")) {
          await $`tput reset && bun ${event}`
        }
      })
    case "run-script":
      await $`tput reset && bun --watch scripts/${args[3]}.ts`
      break
    // trigger fzf search over all scripts and run them with bun --watch
    case undefined:
      console.log("No command provided")
      break
    default:
      console.log("Unknown command")
      break
  }
}

main()
