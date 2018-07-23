# Completions
autoload -Uz compinit && compinit # TODO: ?
# Matches case insensitive for lowercase
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
compdef w=-redirect-,-default-,-default- # So I can autocomplete w <tab>

# History
HISTSIZE=10000 # Lines of history to keep in memory for current session
HISTFILESIZE=10000 # Number of commands to save in the file
SAVEHIST=10000 # Number of history entries to save to disk
HISTFILE=~/.zsh_history # Where to save history to disk
HISTDUP=erase # Erase duplicates in the history file
setopt hist_ignore_dups # Ignore duplicates

# Options - `man zshoptions`
setopt append_history # Append history to the history file (no overwriting)
setopt share_history # Share history across terminals
setopt inc_append_history # Immediately append to the history file, not just when a term is killed
setopt extended_glob # Use extended globbing syntax
setopt auto_cd # Auto change to a dir without typing cd

eval "$(hub alias -s)" # git -> hub
eval "$(direnv hook zsh)" # Direnv

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh # FZF fuzzy search
