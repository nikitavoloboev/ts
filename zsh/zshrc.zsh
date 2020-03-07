# source ~/.zsh_plugins.sh # Load zsh plugins (using antibody)
# source ~/.dotfiles/zsh/env.zsh
# source ~/.dotfiles/zsh/options.zsh
# source ~/.dotfiles/zsh/functions/functions.zsh
# source ~/.dotfiles/zsh/functions/fzf-functions.zsh
# source ~/.dotfiles/zsh/functions/git-functions.zsh
# source ~/.dotfiles/zsh/bindings.zsh
# source ~/.dotfiles/zsh/alias.zsh

# [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# . '/Users/nikivi/Library/Application Support/zrs/z.sh'

# XXX: short circuit tabtab completion auto installation
# tabtab source for serverless package
# tabtab source for sls package

export GOPATH="$(go env GOPATH)" # Go
export PATH="$PATH:$GOPATH/bin" # Go
