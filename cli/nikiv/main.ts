import { Command } from "@effect/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Console, Effect } from "effect"

const command = Command.make("nikiv", {}, () => Console.log("nikiv"))

const cli = Command.run(command, {
  name: "nikiv",
  version: "v0.0.1",
})

cli(process.argv).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
