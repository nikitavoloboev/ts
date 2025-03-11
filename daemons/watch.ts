import Watcher from "watcher"
import { $ } from "bun"
import path from "node:path"
import os from "node:os"

async function main() {
  // goku config
  const gokuConfigPath = path.join(os.homedir(), "src/config/karabiner")
  const gokuConfigPathWatcher = new Watcher(gokuConfigPath)
  gokuConfigPathWatcher.on("change", async (filePath) => {
    const targetFile = path.join(
      os.homedir(),
      "src/config/karabiner/karabiner.edn",
    )
    if (filePath === targetFile) {
      // TODO: if error, show notification
      await $`${os.homedir()}/bin/goku`
    }
  })
}

await main()

// TODO: has issues crushing
// github bio
// const githubBioPath = path.join(
//   os.homedir(),
//   "src/other/nikitavoloboev/readme.md",
// )
// const githubBioWatcher = new Watcher(githubBioPath)
// githubBioWatcher.on("change", async () => {
//   await $`cd ~/src/other/nikitavoloboev && git add . && git commit -m "." && git push`
// })
