# Setting and editing of env variables.

# Vars
export EDITOR='nvim'
export SUDO_EDITOR='nvim'
export DOTFILES="$HOME/.dotfiles"

# FZF TODO: not sure if I need..
export FZF_DEFAULT_COMMAND='rg --files --no-ignore --hidden --follow -g "!{.git,node_modules}/*" 2> /dev/null'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

# TODO: ?
export NODE_PATH='/usr/local/lib/node_modules'

# PATH
export PATH=$PATH/usr/local/bin
export PATH=$PATH:~/.dotfiles/bin
export PATH=$PATH:~/.cargo/bin # Rust
export GOPATH="$(go env GOPATH)" # Go
export PATH="$PATH:$GOPATH/bin" # Go
export PATH=$PATH:~/.npm-global/bin # npm globally installed

typeset -U PATH # Remove duplicates in $PATH