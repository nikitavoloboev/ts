# TS libraries

I run all code with [Bun](https://bun.sh).

Neet to setup a nice way to export things inside [lib](lib) folder to NPM.

## Develop

All library code is found in [lib](lib). All code that I'm trying out is in [try](try) folder.

I also use [run.ts](run.ts) file as a quick way to run some code and see output of it.

```
bun run.ts
```

Or for better DX, I use [watchexec](https://watchexec.github.io/) command and run:

`watchexec --restart --exts ts "tput reset && bun run.ts" --project-origin .`

This will rerun [run.ts](run.ts) file if any of the .ts files change. Makes for nice experience developing. Swap `run.ts` for a file you want to run.

## Deno

I also am [exploring using Deno](https://github.com/nikitavoloboev/deno) as it has some interesting ideas/libraries.

### Thanks

All contributions or ideas for how to improve the project are welcome.

You can support the project on [GitHub Sponsors](https://github.com/sponsors/nikitavoloboev) or see [other projects](https://nikiv.dev/projects).

[![Thanks](https://bit.ly/saythankss)](https://github.com/sponsors/nikitavoloboev) [![Twitter](http://bit.ly/nikitatweet)](https://twitter.com/nikitavoloboev) [![0BSD](https://img.shields.io/badge/license-0BSD-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://choosealicense.com/licenses/0bsd/)
