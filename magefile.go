// +build mage

package main

import (
	"log"
	"os"
)

// Setup macOS. Install apps, tools, link dotfiles.
func Setup() {
	// installApps()
	// installCLI()
	Link()
}

// Link dotfiles.
func Link() {
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
func installCLI() {
	brewInstall()
	goInstall()
	rustInstall()
}

func brewInstall() {
	// cmds := []string{"neovim"}
	// for _, app := range cmds {
	// }
}

func goInstall() {
	// TODO: install with go
}

func rustInstall() {
	// TODO: install with cargo/brew?
}

// func zshSetup() {
// }

// TODO: add cmd with https://github.com/r-darwish/topgrade?
// TODO: combile mage into binary to use globally
