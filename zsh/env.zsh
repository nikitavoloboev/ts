# Setting and editing of env variables.

# Vars
export EDITOR='nvim'
export SUDO_EDITOR='nvim'

# PATH
export PATH=$PATH:~/.dotfiles/bin
export PATH=$PATH:~/.cargo/bin # Rust
export GOPATH="$(go env GOPATH)" # Go
export PATH="$PATH:$GOPATH/bin" # Go
export PATH=$PATH:~/.npm-global/bin # npm globally installed

typeset -U PATH # Remove duplicates in $PATH