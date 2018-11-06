# Setting and editing of env variables.

# Vars
export EDITOR='nvim'
export SUDO_EDITOR='nvim'

# PATH
export PATH=$PATH:~/.dotfiles/bin
export PATH=$PATH:~/.cargo/bin # Rust
export GOPATH="$(go env GOPATH)" # Go
export PATH="$PATH:$GOPATH/bin" # Go

# TODO: ?
. "$HOME/.nix-profile/etc/profile.d/hm-session-vars.sh"

# TODO: change my pure prompt if I am in direnv env 
# look at the existing prompt and use below function as it returns needed info
has_direnv() { if [[ -n $DIRENV_DIFF ]]; then echo in direnv; else echo not; fi }

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

typeset -U PATH # Remove duplicates in $PATH
