# Setting and editing of env variables.

# Vars
export EDITOR='nvim'
export SUDO_EDITOR='nvim'

# PATH
export PATH=$PATH:~/.dotfiles/bin # Scripts & utilities
export PATH=$PATH:~/.cargo/bin # Rust
export GOPATH="$(go env GOPATH)" # Go
export PATH="$PATH:$GOPATH/bin" # Go
export PATH=~/anaconda3/bin:$PATH # Anaconda

export PATH=$PATH:./node_modules/.bin

# TODO: remove? ask on nix irc or nix darwin
. "$HOME/.nix-profile/etc/profile.d/hm-session-vars.sh"

eval "$(hub alias -s)"
eval "$(direnv hook zsh)"

# fnm
eval "$(fnm env --multi)"

if command -v pazi &>/dev/null; then
  eval "$(pazi init zsh)"
fi

# TODO: change pure prompt when I am in direnv env. Below func returns needed info
# has_direnv() { if [[ -n $DIRENV_DIFF ]]; then echo in direnv; else echo not; fi }

typeset -U PATH # Remove duplicates in $PATH
