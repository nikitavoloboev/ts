# TS

> TS libraries and other code

## Files

- [packages](packages) - TS packages
  - [util](packages/util) - Utility functions
- [try](try) - trying various TS code/libraries

## Setup

[Bun](https://bun.sh/) is used to run things.

```
bun i
```

## Run

I use this repo to test TS code fast. Create a file `run.ts` in root, if you want to be able to run below command.

```
bun dev
```

Runs: `tput reset && bun --watch run.ts`

## Tests

```
bun test:watch
```

## Publish libraries

> **Warning**
> I still don't know how to publish libraries in TS well. Below instructions are incomplete. If you know how to publish TS packages, please contact me on [X](https://twitter.com/nikitavoloboev) ♥️

Thinking of trying [this approach with Deno](https://dev.to/jlarky/creating-an-npm-package-in-2024-deno-dnt-3467).

```
tsup src/index.ts --format esm --dts
```

Will create a `dist` folder out of exported functions.

Update version number in package.json and commit changes.

Then you can run:

```
npm publish
```

## Deno

Exploring use of [Deno in separate repo](https://github.com/nikitavoloboev/deno) as it has interesting ideas/libraries. Might become part of this repo too.

## Contribute

Always open to useful ideas or fixes in form of issues or PRs.

Can [open new issue](../../issues/new/choose) (search [existing issues](../../issues) first) or [start discussion](../../discussions).

It's okay to submit draft PR as you can get help along the way to make it merge ready.

Join [Discord](https://discord.com/invite/TVafwaD23d) for more indepth discussions on this repo and [others](https://github.com/nikitavoloboev#src).

### 🖤

Inspired by [nothing-but](https://github.com/thetarnav/nothing-but).

[Support on GitHub](https://github.com/sponsors/nikitavoloboev) or look into [other projects](https://nikiv.dev/projects).

[![Discord](https://img.shields.io/badge/Discord-100000?style=flat&logo=discord&logoColor=white&labelColor=black&color=black)](https://discord.com/invite/TVafwaD23d) [![X](https://img.shields.io/badge/nikitavoloboev-100000?logo=X&color=black)](https://twitter.com/nikitavoloboev) [![nikiv.dev](https://img.shields.io/badge/nikiv.dev-black)](https://nikiv.dev)
