import Watcher from "watcher"
import { $ } from "bun"
import path from "node:path"
import os from "node:os"

async function main() {
  const gokuConfigPath = path.join(os.homedir(), "src/config/karabiner")
  const gokuConfigPathWatcher = new Watcher(gokuConfigPath)
  gokuConfigPathWatcher.on("change", async (filePath) => {
    const targetFile = path.join(
      os.homedir(),
      "src/config/karabiner/karabiner.edn",
    )
    if (filePath === targetFile) {
      // TODO: if error, show notification
      // on success it says `Done!`, can check for that?
      await $`/opt/homebrew/bin/goku`
    }
  })
}

await main()
