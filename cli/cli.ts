// TODO: improve on switch case in https://github.com/learn-anything/learn-anything.xyz/blob/dev/cmd.ts
// make it so you can for given command get its help
// or take the `//` before each case and generate a table in readme with possible commands and descriptions
// probably better to wrap around https://github.com/effect-ts/effect/tree/main/packages/cli
// example: https://github.com/IMax153/dadinator
// make it nice/clean DX though

// in https://github.com/learn-anything/learn-anything.xyz/blob/dev/cmd.ts
// there is this code
// case undefined:
//   console.log("No command provided")
//   break
// default:
//   console.log("Unknown command")
//   break
// it should be automated away and instead show `--help` when wrong command or no command is entered
// should be friendly UX
