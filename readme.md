# TS

> TS libraries and other code

## Setup

[Bun](https://bun.sh) is used to run/install things.

It requires [ts-utils](https://github.com/nikitavoloboev/ts-utils) to be present in packages.

```
mkdir packages
cd packages
git clone https://github.com/nikitavoloboev/ts-utils
cd ..
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

## Packages

Currently I only publish [TS Utils package](https://github.com/nikitavoloboev/ts-utils).

## Contribute

Always open to useful ideas or fixes in form of issues or PRs.

Can [open new issue](../../issues/new/choose) (search [existing issues](../../issues) first) or [start discussion](../../discussions).

It's okay to submit draft PR as you can get help along the way to make it merge ready.

Join [Discord](https://discord.com/invite/TVafwaD23d) for more indepth discussions on this repo and [others](https://github.com/nikitavoloboev#src).

### 🖤

[Support on GitHub](https://github.com/sponsors/nikitavoloboev) or look into [other projects](https://nikiv.dev/projects).

[![Discord](https://img.shields.io/badge/Discord-100000?style=flat&logo=discord&logoColor=white&labelColor=black&color=black)](https://discord.com/invite/TVafwaD23d) [![X](https://img.shields.io/badge/nikitavoloboev-100000?logo=X&color=black)](https://twitter.com/nikitavoloboev) [![nikiv.dev](https://img.shields.io/badge/nikiv.dev-black)](https://nikiv.dev)
