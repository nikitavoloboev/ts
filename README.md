# My configuration files for macOS [![Thanks](http://bit.ly/saythankss)](https://github.com/users/nikitavoloboev/sponsorship)

> Zsh, Karabiner, VS Code, Sublime, Neovim, Nix

![](https://i.imgur.com/e1Ei3b1.jpg)

> Using [screenfetch](https://github.com/KittyKatt/screenFetch). I don't split my editors like that, usually use each window in full screen, often with iPad as Sidecar for web/app dev.

These are the various configuration files I use on macOS. I wrote about how you can customize your shell experience in an article [here](https://medium.com/@nikitavoloboev/pretty-and-fast-shell-97ea870f2805).

You can also see my top used applications, Safari extensions and Alfred workflows I use [here](https://github.com/nikitavoloboev/my-mac-os) alongside descriptions with how I use the tools.

## Clean install

1. Boot latest macOS version. Make sure username is the name you want the home folder to be (by default its first name & last name).
2. Go through [preferences](https://imgur.com/a/KoVAxFQ) & set everything up.
3. Download & install [apps I use](https://github.com/nikitavoloboev/my-mac-os).
4. Clone dotfiles & [set everything up](#setup--sync-dotfiles).
5. [Sync settings](https://github.com/zenangst/Syncalicious) for apps I use.

The setup & apps/tools I use is heavily tailored to my own workflow so it is best you take ideas from it rather than copy entire config.

## Setup & sync dotfiles

Take a look at [install](install) shell script. It will install [brew](https://brew.sh), [go](https://go.dev) & [mage](https://github.com/magefile/mage).

Run it with `./install`. As part of the script it will run `mage setup`. Take a look at the [magefile.go](magefile.go) `Setup` function to see what it will do.

You can also run `mage` alone to see what commands you can run with descriptions of them.

In short, it will create appropriate symlinks pointing at files in `~/.dotfiles`. This is an assumption of where the dotfiles repo is placed.

It will also install CLI tools & apps.

## Interesting dotfiles

[Here](https://wiki.nikitavoloboev.xyz/unix/dotfiles) are dotfiles I got many ideas from and liked. I also mention [Nix configurations I liked](https://wiki.nikitavoloboev.xyz/operating-systems/linux/nixos).

## Contributing

[Suggestions](../../issues/) on how I can improve the structure of these dotfiles as well as suggesting new and awesome tools are welcome.

## Thank you

You can support me on [GitHub](https://github.com/users/nikitavoloboev/sponsorship) or look into [other projects](https://nikitavoloboev.xyz/projects) I shared.

[![MIT](https://img.shields.io/badge/license-MIT-0a0a0a.svg?style=flat&colorA=0a0a0a)](LICENSE) [![Twitter](http://bit.ly/nikitatweet)](https://twitter.com/nikitavoloboev)
