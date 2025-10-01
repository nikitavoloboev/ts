# flow

> CLI to do things fast

## Setup

This project installs its executable into `~/bin`, so create that directory and ensure it is on your `$PATH` first.

Clone the repository, install [Taskfile](https://taskfile.dev), then run:

```
task publish
```

`task publish` uses Bun to generate `~/bin/flow-ts`, a small shim that imports `src/main.ts`. After installing you can confirm things are wired up with:

```
flow-ts --version
```

If you change the CLI, re-run `task publish` to refresh the shim.

## Usage

Running the command without arguments prints the built-in help:

```
flow-ts 0.1
CLI to do things fast

Commands:
  clearGhNotifs   Clear GitHub notifications (placeholder)
  sendEmail       Send email through Resend using Markdown templates (default: ~/.config/friendik/email/send.md)
  clone           Clone a repo into ~/gh/<namespace>/<repo>

Flags:
  --version, -v   Show CLI version
  --help          Show command-specific help

Examples:
  flow-ts sendEmail --help
  flow-ts clone git@github.com:user/repo.git
```

### Commands

- `flow-ts clearGhNotifs` – placeholder that currently just prints a stub message.
- `flow-ts sendEmail` – renders a Markdown template and sends it through the Resend API.
- `flow-ts clone <repo>` – clones a Git repository into `~/gh/<namespace>/<repo>` after validating the path.

### Sending email with Resend

`flow-ts sendEmail` expects `RESEND_API_KEY` to be present in your environment. It resolves the email template from (in order):

1. `--content` / `--file` CLI flag
2. `RESEND_CONTENT`
3. `~/.config/friendik/email/send.md`

The template is Markdown with YAML front matter. A minimal example:

```
---
from: team@example.com
to:
  - you@example.com
subject: Launch Update
---

# Launch Update

Body content in Markdown...
```

You can supply `cc`, `bcc`, and `replyTo` fields in the front matter or via `RESEND_CC`, `RESEND_BCC`, and `RESEND_REPLY_TO`. CLI flags (`--from`, `--to`, `--subject`) and their corresponding environment variables override the template values when present.

## Contributing

PRs are always welcome. I mainly work in [codex](https://github.com/openai/codex) and [Cursor](https://cursor.com), but I'm happy to review **working**, **useful** changes that make the CLI better.

### 🖤

[![Discord](https://go.nikiv.dev/badge-discord)](https://go.nikiv.dev/discord) [![X](https://go.nikiv.dev/badge-x)](https://x.com/nikitavoloboev) [![nikiv.dev](https://go.nikiv.dev/badge-nikiv)](https://nikiv.dev)
