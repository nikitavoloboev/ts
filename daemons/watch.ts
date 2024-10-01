import Watcher from "watcher"
import { $ } from "bun"
import path from "node:path"
import os from "node:os"

async function main() {
  // TODO: watch over ~/downloads and sort things automatically
  // TODO: watch over other folders?
  // const downloadsPath = path.join(os.homedir(), "downloads")
  // const downloadsPathWatcher = new Watcher(downloadsPath)
}

await main()
