// +build mage

package main

// Setup macOS. Install apps, tools, bootstrap dotfiles.
func Setup() {
	apps := string{"vscode", "iterm"}
	installApps(aps)
	// TODO: for apps not part of brew cask, offer to open URLs for download pages of apps
}

// Link dotfiles.
func Link() {
}

func installApps(apps: string[]) {
	for _, app := range apps {
		installApp(app)
	}
}

func installApp(app: string) {
	// brew cask install <app>
}
