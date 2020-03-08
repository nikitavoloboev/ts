// +build mage

package main

import (
	"log"
	"os"

	"github.com/magefile/mage/sh"
)

// Setup macOS. Install apps, tools, link dotfiles.
func Setup() {
	// installApps()
	// installCLI()
	Link()
}

// Link dotfiles.
func Link() {
	// TODO: check that user has `~/.dotfiles` repo. Quit otherwise.

	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}
	home = home + "/"
	dots := home + ".dotfiles/"
	links := make(map[string]string) // original file location -> location in dotfiles

	// Zsh
	links[home+".zshrc"] = dots + "zsh/zshrc.zsh"
	// links[home+".zprofile"] = dots + "zsh/zprofile.zsh"

	// Git
	links[home+".gitconfig"] = dots + "git/gitconfig"
	links[home+".gitignore_global"] = dots + "git/gitignore_global"

	links[home+".config/karabiner.edn"] = dots + "karabiner/karabiner.edn"

	// Sublime Text
	// links[home+"Library/Application Support/Sublime Text 3/Packages/User"] = dots + "sublime"

	// Neovim
	// links[home+".config/nvim"] = dots + "nvim"

	// VS Code
	// links[home+"Library/Application Support/Code/User/settings.json"] = dots + "vscode/settings.json"
	// links[home+"Library/Application Support/Code/User/keybindings.json"] = dots + "vscode/keybindings.json"

	for origLoc, dotLoc := range links {
		os.Remove(origLoc)
		err := os.Symlink(dotLoc, origLoc)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func installApps() {
	// TODO: for apps not part of brew cask, offer to open URLs for download pages of apps
	apps := []string{"vscode-insiders", "iterm"}
	for _, app := range apps {
		caskInstall(app)
	}
}

func caskInstall(app string) {
	// brew cask install <app>
}

// Install CLI tools I use.
func InstallCLI() {
	brewInstall() // must be run 1st as it installs things like rust compiler (cargo)
	// goInstall()
	// rustInstall()
}

func brewInstall() {
	cmds := []string{"neovim", "starship", "exa", "diff-so-fancy", "rustup"}
	cmdTaps := []string{"getantibody/tap/antibody"}

	for _, app := range cmds {
		// check if cmd is installed
		err := sh.Run("brew", "list", app)
		if err != nil {
			// install it if it doesn't exist
			err = sh.RunV("brew", "install", app)
			continue
		}
		// skip to next cmd
		continue
	}

	for _, app := range cmdTaps {
		// check if cmd is installed
		err := sh.Run("brew", "list", app)
		if err != nil {
			// install it if it doesn't exist
			err = sh.RunV("brew", "install", app)
			continue
		}
		// skip to next cmd
		continue
	}
}

func goInstall() {
	// TODO: install with go
	// err := sh.RunV("go", "get")
	// if err != nil {
	// 	log.Fatal(err)
	// }
}

func rustInstall() {
	cmds := []string{"git-trim"}
	// TODO: check if rust is installed (cargo is in path)
	// TODO: if not, run rustup-init (https://formulae.brew.sh/formula/rustup-init)
}

func yarnInstall() {
	// TODO: install with yarn
}

func vscodeExtensionInstall() {
	// code --list-extensions = all exts
	// maybe can sync folder or config
}

func ZshSetup() {
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}
	// hide annoying `Last login ` msg on shell startup
	os.Create(home + "/.hushlogin")
}

func Defaults() {
	// TODO: move running of default set cmds from macos/set-defaults.sh
	// TODO: check that its running in macos
	// TODO: run cmds
}

// Install provided commands with a package manager.
func installCMDS(cmds []string, packageManager string) {
	// TODO: have a way to run cmd in go by giving it a full string
	// so can then do sh.Run(packageManager + cmd)

	// for _, app := range cmds {
	// 	// check if cmd is installed
	// 	err := sh.Run("brew", "list", app)
	// 	if err != nil {
	// 		// install it if it doesn't exist
	// 		err = sh.RunV("brew", "install", app)
	// 		continue
	// 	}
	// 	// skip to next cmd
	// 	continue
	// }
}

// TODO: add cmd with https://github.com/r-darwish/topgrade?
// TODO: combile mage into binary to use globally
// TODO: cleanup dead symlinks as part of Link
// - clean: ["~", "~/.config"] had this in dotbot
