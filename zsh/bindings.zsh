bindkey -e # Emacs keymap
export KEYTIMEOUT=1 # Shorter delay typing

# TODO: see different widgets that can be ran. For moving especially

# Control
bindkey "^f" beginning-of-line
bindkey "^g" end-of-line # TODO: change to ctrl + : instead
bindkey "^k" forward-word
bindkey "^j" backward-word
bindkey "^e" kill-whole-line

# TODO: add insert './'