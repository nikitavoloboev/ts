# My configuration files for macOS [![Thanks](http://bit.ly/saythankss)](https://patreon.com/nikitavoloboev)

> Zsh, Karabiner, VS Code, Sublime, Neovim, Nix, Hammerspoon

![](https://i.imgur.com/uKsu94o.png)

These are the various configuration files I use on macOS. I wrote about how you can customize your shell experience in an article [here](https://medium.com/@nikitavoloboev/pretty-and-fast-shell-97ea870f2805).

You can also see my top used applications, Safari extensions and Alfred workflows I use [here](https://github.com/nikitavoloboev/my-mac-os#readme).

##### Contents

- [Install](#install)
- [Clean install everything](#clean-install-everything)
- [Karabiner](#karabiner)
- [Neovim](#neovim)
- [VS Code](#vs-code)
- [Sublime Text](#sublime-text)
- [Hammerspoon](#hammerspoon)
- [Zsh](#zsh)
  - [Aliases and functions](#aliases-and-functions)
- [FZF](#fzf)
- [Interesting dotfiles](#interesting-dotfiles)
- [Contributing](#contributing)

## Install

To install my configuration, clone the repository and run: `./install`. This install assumes that this repository is placed in `~/.dotfiles` dir.

This will automatically setup all the configuration files using [Dotbot](https://github.com/anishathalye/dotbot). Look [here](https://github.com/nikitavoloboev/dotfiles/blob/master/.install.conf.yaml#L1) for what exactly it will do.

I describe my custom configuration I use below. It is heavily tailored to my own workflow so it is best you take ideas from it rather than copying the entire config.

### Clean install everything

1. Download [KM macros](https://wiki.nikitavoloboev.xyz/macOS/apps/keyboard-maestro/km-macros.html)
2. Download [Alfred workflows](https://github.com/learn-anything/alfred-workflows#readme)
3. Download dotfiles & set everything up (instructions above)
4. Download & install apps from [my macOS](https://github.com/nikitavoloboev/my-mac-os)

## Karabiner

<img src="https://imgs.xkcd.com/comics/borrow_your_laptop_2x.png" width="300" alt="img">

The most exciting thing in here is probably how I utilize [Karabiner](https://pqrs.org/osx/karabiner/). It has absolutely transformed the way I interact with my computer and there is no going back now.

I go over how I use Karabiner in detail [here](https://wiki.nikitavoloboev.xyz/macOS/apps/karabiner/karabiner.html). I generate [my config](karabiner/karabiner.edn) for it with [Goku](https://github.com/yqrashawn/GokuRakuJoudo#readme).

## Neovim

[Vim language](https://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118) is the best text editing experience you will ever get. It is worth learning it as you will start thinking about text editing differently.

My Neovim config can be seen [here](nvim/init.vim). I use [Monokai Night theme](https://github.com/nikitavoloboev/vim-monokai-night#readme) with [many plugins](https://wiki.nikitavoloboev.xyz/text-editors/vim/vim-plugins.html). Here is how it looks:

![](https://i.imgur.com/sLXBvv7.png)

## VS Code

My main editor of choice is [VS Code](https://github.com/Microsoft/vscode) since it has well built [vim mode](https://github.com/VSCodeVim/Vim).

Configs I use for it can be seen [here](https://github.com/nikitavoloboev/dotfiles/tree/master/vscode). And [here](https://wiki.nikitavoloboev.xyz/text-editors/vs-code/vs-code-extensions.html) is a list of extensions I use.

## Sublime Text

I use it primarily to edit markdown files like [my wiki](https://wiki.nikitavoloboev.xyz/other/wiki-workflow.html). I also edit config files and open large and small files for quick edits.

I use [many plugins](https://wiki.nikitavoloboev.xyz/text-editors/sublime-text/sublime-text-plugins.html) together with [Ayu theme](https://github.com/dempfi/ayu).

## Hammerspoon

I don't use [Hammerspoon](http://www.hammerspoon.org/) as extensively however I am looking into implementing more of its features into my workflow.

## Zsh

I am using [Zsh](http://www.zsh.org) as my shell and [Antibody](https://github.com/getantibody/antibody) to install all [my Zsh plugins](https://wiki.nikitavoloboev.xyz/unix/shell/zsh/zsh-plugins.html).

I am also using [Monokai Night theme](https://github.com/nikitavoloboev/my-mac-os/tree/master/iterm#readme) I made for iTerm. Here is how my prompt looks:

![](https://i.imgur.com/SQbqPLN.png)

### Aliases and functions

I use many aliases to get around my system as fast as possible. You can view them all [here](zsh/alias.zsh).

There is a lot of awesome programs I use from my command line. You can see [here](https://github.com/nikitavoloboev/my-mac-os#command-line-apps) for all of them.

I also love customizing my shell experience with various aliases and Zsh functions. Here are some that I like and use often:

#### Commit and push repository to GitHub

```Bash
ggi() {
    git init
    mit
    git add .
    git commit -m "Init"
    git remote add origin $(osascript -e 'tell application "Safari" to return URL of front document')
    git push -u origin master
}
```

Say I created some project and wrote some code in it or added a simple README with some text in it. I then go on to create a [new GitHub repository](https://github.com/new) and give it a name. After that I just run this `ggi` command.

It will initialize my current directory with git if it wasn't already. It will then call this function:

```Bash
mit() {
  license-up mit Nikita Voloboev nikitavoloboev.xyz
  git add LICENSE
}
```

Which using [this CLI tool](https://github.com/nikitavoloboev/license-up), will create a license file and git add it. It will then take the URL of my current browser window which will be at the newly created repository, point the local git repo to push there and push it.

And thus in one command I initialized and pushed the repo. To create a new repo quickly I use [this Alfred workflow](https://github.com/nikitavoloboev/alfred-ask-create-share).

#### Commit all with generic `update` message

I use this command when I find no commit message is necessary.

```Bash
ggs() {
    git add .
    git commit . -m 'update'
    git push
}
```

#### Clone current URL in clipboard

```Bash
gll(){
    git clone "$(pbpaste)"
}
```

I use this often to quickly clone the URL that I copied from GitHub.

#### Trash files / folders

A lot safer than to `rm -rf` files as you can always check out `~/.Trash` in cases of emergency or mistakes.

```Bash
re(){
  mv "$1" ~/.Trash
}
```

## FZF

[FZF](https://github.com/junegunn/fzf) is a command line tool that lets you fuzzy search on text. I use it often now for fuzzy searching for files to open with neovim, or fuzzy searching through my commit messages and more. Here are [all the functions I use](https://github.com/nikitavoloboev/dotfiles/blob/master/zsh/functions/fzf-functions.zsh#L1) with it.

## Interesting dotfiles

These are dotfiles I got many ideas from and liked.

- [bluz71](https://github.com/bluz71/dotfiles) - Interesting vim setup.
- [caarlos0](https://github.com/caarlos0/dotfiles) - Made antibody.
- [wangsongiam](https://github.com/wangsongiam/dotfiles) - Interesting Hammerspoon and Zsh config.
- [Keith](https://github.com/keith/dotfiles) - Vim, Zsh, Tmux, and macOS.
- [bresilla](https://github.com/bresilla/dotfiles) - Neat Linux look.

## Contributing

[Suggestions](../../issues/) on how I can improve the structure of these dotfiles as well as suggesting new and awesome tools are welcome.

## Thank you

You can support me on [Patreon](https://www.patreon.com/nikitavoloboev) or look into [other projects](https://nikitavoloboev.xyz/projects) I shared.

[![MIT](https://img.shields.io/badge/license-MIT-0a0a0a.svg?style=flat&colorA=0a0a0a)](LICENSE) [![Twitter](http://bit.ly/nikitweet)](https://twitter.com/nikitavoloboev)
