# Setting and editing of env variables.

# Vars
export EDITOR='nvim'
export SUDO_EDITOR='nvim'

# PATH
export PATH=$PATH:~/.dotfiles/bin # Scripts & utilities
export PATH=$PATH:~/.cargo/bin # Rust
export GOPATH="$(go env GOPATH)" # Go
export PATH="$PATH:$GOPATH/bin" # Go

export PATH=$PATH:./node_modules/.bin

# TODO: remove?
. "$HOME/.nix-profile/etc/profile.d/hm-session-vars.sh"

# node.js ver. manager (https://github.com/Schniz/fnm)
eval `fnm env`

# TODO: change my pure prompt if I am in direnv env
# look at the existing prompt and use below function as it returns needed info
has_direnv() { if [[ -n $DIRENV_DIFF ]]; then echo in direnv; else echo not; fi }

typeset -U PATH # Remove duplicates in $PATH
