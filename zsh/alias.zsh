# Temp

# TODO: clean it & use only what I need

# Nix
alias nr='nix repl'

# Nix env
alias n='nix-env'
alias nq='nix-env -q | fzf | xargs -I{} nix-env -e {}' # Search installed packages to uninstall
alias nQ='nix-env -q' # See installed packages
alias nuu='nix-env -u' # Upgrade packages

# Nix shell
alias ns="nix-shell --run zsh"
alias nss="nix-shell --run zsh -p"

# General
alias te='tree'
alias op='open'
alias env='env | fzf'
alias dnd='do-not-disturb toggle'
alias cleanup="find . -type f -name '*.DS_Store' -ls -delete" # Recursively delete `.DS_Store` files
alias g='git' # Wrapper over git
alias peek='tee >(cat 1>&2)' # Mirror stdout to stderr, useful for seeing data going through a pipe
alias aet='subl CONTRIBUTING.md'
alias crypto='curl rate.sx' # Get crypto prices
alias pubkey="more ~/.ssh/id_rsa.pub | pbcopy | echo '=> public key copied to pasteboard'"
alias lc='tokei'
alias sf='screenfetch -E'
alias rw='open -a "Marked 2" README.md'
alias mr='open -a "Marked 2"'
alias _='sudo'
alias ae='subl README.md' # Edit readme file
alias yi="python -i"
alias kar="/Applications/Karabiner.app/Contents/Library/bin/karabiner"
alias le='less -r'
alias wifi='wifi-password -q'
# alias du='du -sh * | sort'
alias eo='echo'
alias es='elasticsearch'
alias mc='md-to-alfred'
alias pd='pandoc'
alias yt='yotube-dl'
alias r='rg'
alias e='nvim'
alias s='subl'
alias ss='subl .'
alias alf='alfred'
alias ta='touch readme.md'
alias d='cd'
alias alert="tput bel" # Bell when the program is finished. i.e. npm install && alert
alias sd='sudo'
# TODO: fk alias to run last cmd as sudo instantly
alias lg='ls | grep'
alias so='source'
alias top="vtop"
alias ka='echo'
alias rl='curl'
alias how='howdoi'
alias ua='unalias'
alias sudo='sudo '
alias m='mkdir'
alias jj='killall tmux'
alias mm='tldr'
alias ma='man'
# alias aw='k -h' TODO: ?
alias rec='asciinema rec'
alias dus='du -s'
alias to='touch'
alias t='bat'
alias zo='open'
alias ff='open .'
alias ki='kill'
alias icat='imgcat'
alias tt='tldr'
alias tre='tree -a'
alias q='exit'
alias screen='screenfetch'
alias ad='open .'
alias mx='chmod +x'
alias rr='rm -rf'
# alias a='ls -FG'
alias a='exa'
alias aa='exa -la' # See hidden files
alias wg='wget -r --no-parent'
alias v='mv'
alias os='osascript'
alias lt='ls -lart'
# alias aa='ls -lahFG'
# alias aa='exa -lahF'
alias tp='type'
#alias cl='/usr/local/bin/m'
# alias gr='goreleaser'

# Dev
alias ll='ln -s'
alias jd='jid'
alias tm='task'
alias rf='reflex'
alias ser='serve'
# alias h='python -m http.server'
alias cra='npx create-react-app'
alias lic='legit'

# App
#alias to.='gittower .' # Open current dir in Tower

# Python
alias p='python'
alias p2='python2'

# Alfred
alias wf='alfred build'
alias wfl='alfred link'
alias wfa='alfred pack -o ~/Desktop'
alias ws='workflow-install -s workflow' # Symlink `source` directory

# Docker
alias o='docker'
# alias or='docker rm'
# alias oc='docker compose'
# alias og='docker logs'
# alias ogt='docker logs --tail 100'
# alias os='docker ps'
# alias osq='docker ps -q'
# alias osa='docker ps -a'
# alias ok='docker kill'

# Kubernetes
alias k='kubectl'
alias kl='kubectl logs'
alias ke='kubectl describe'
alias kx='kubectl explain'
alias kg='kubectl get'

# Node
alias nd='node'
alias ndi='node install'
alias n.='node .'

# NPM
alias i='npm'
alias ii='npm install'
alias ig='npm install -g'
alias iir='npm install && npm run dev'
alias iis='npm install && npm start'
alias in='npm init'
alias ia='npm add'
alias ir='npm run'
alias ire='npm remove'
alias is='npm start'
alias dev='npm dev'

# Go
alias org='richgo'
alias og.='go get ./...' # go get all packages for current project
alias ot='playgo'
alias or='go run'
alias oo='go install'
alias ov='go vet'
alias ogu='go get -u' # use the network to update the named packages and their dependencies
alias ob='go build'
alias ora='go-pry'
alias oe='go build -o main'
alias ugo='Go-Package-Store' # displays updates to Go packages

# Ruby
alias rb='ruby'

# Piping
alias h2='head -n 2'
alias h10='head -n 10'
alias t10='tail -n 10'

alias hs='ghci'

alias cwd='pwd | pbcopy'

# Delete things
alias rrpdf='rm -rf *.pdf'

# Source things
alias sz='exec zsh'

# Hugo
alias us='hugo server -D'
alias ut='hugo server -w' # testing
alias u='hugo'

# Nginx
alias ngup='sudo nginx'
alias ngdown='sudo nginx -s stop'
alias ngre='sudo nginx -s stop && sudo nginx'
alias nglog='tail -f /usr/local/var/log/nginx/access.log' # TODO: maybe wrong location
alias ngerr='tail -f /usr/local/var/log/nginx/error.log'

# Utility
alias net="ping ya.ru | grep -E --only-match --color=never '[0-9\.]+ ms'"                # check connection
alias history-stat="history 0 | awk '{print \$2}' | sort | uniq -c | sort -n -r | head"
alias ba="bash"

# easier navigation
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."

alias cpu='top -o cpu'   # CPU
alias mem='top -o rsize' # Memory

# macOS
alias bb='pbcopy'

# Text editors
alias xx='open -a Xcode'
alias x.='open -a Xcode .'
#alias ae='open -a MacDown readme.md'
alias we='code'
alias ww='code .'
# alias ar="open -a Marked\ 2"
alias zr='open -a Preview'

# Web
alias sc="open -a Google\ Chrome"
alias sf="open -a Safari"

# Other
alias pdf='open -a PDF\ Expert'
alias love="/Applications/love.app/Contents/MacOS/love"

# Vim
alias ee='nvim .' # Current dir
alias ei='nvim index.js'
alias egi='nvim .gitignore' # TODO: make it zsh func, go to root and then run it
alias ej='nvim package.json'

# Edit configs
alias ew='nvim ~/.dotfiles/nvim/init.vim' # nvimrc
alias essh='nvim ~/.ssh/config' # ssh config
alias ek='nvim ~/.dotfiles/karabiner/karabiner.edn'
alias ez='nvim ~/.zshrc'

# cd places
alias dw='cd ~/Documents/'
alias dsh='cd ~/.ssh'
alias dn='cd ~/Documents/src/clones'
alias di='cd ~/Documents/src/ideas'
alias dg='cd ~/go/src/github.com/nikitavoloboev'
alias dl='cd ~/Documents/src/learn'
alias dt='cd ~/Documents/src/test'
alias dm='cd ~/Documents/src/games'
alias da='cd ~/Documents/src/'
alias ds='cd ~/Documents/src/alfred'
alias dla='cd ~/Documents/src/orgs/learn-anything'
alias dz='cd ~/.dotfiles'
alias de='cd ~/Desktop'
alias dq='cd ~/Downloads'
alias dls='cd ~/Library/Services'
alias drp='cd ~/Dropbox'

# Xcode
alias dx='cd ~/Documents/src/Xcode'
alias dxi='cd ~/Documents/src/Xcode/iOS'
alias dxm='cd ~/Documents/src/xcode/macOS'

# Config
alias d..='cd ~/.config'
alias db='cd ~/.dotfiles/bin'
alias dh='cd ~/.hammerspoon'

# Utilities
alias ungit="find . -name '.git' -exec rm -rf {} \;" # Remove git from a project
alias gto='gittower'

# Git
alias gj='open `git config remote.origin.url`'
alias ger='git checkout -' # Checkout last branch you were on
alias grl='git reset --hard && git clean -df' # Reset to exact state as last commit
alias grhf='git checkout HEAD --' # Git reset single file
alias glo='git log --pretty=oneline --abbrev-commit --graph --decorate'
alias gpm="git push origin master"
alias gfk='git fetch && git reset --hard && git clean -dfx' # Reset repo to clean remote state
alias gsp='git pull --rebase --autostash' # Git stash, pull and apply stash
alias gu='git issues'
alias gdp='git reset --hard HEAD~; git push --force-with-lease' # Delete previous commit locally and remote
alias gpd="git push origin develop"
alias ggh='push -u origin HEAD'
alias gre='git rebase -i HEAD~4'
alias gsh='git stash'
alias gb='git checkout -b'
alias grh='git reset --hard HEAD'
alias gr='git reset --hard'
alias grc='git rm --cached'
alias ggn='git_add_origin_and_origin_push'
# alias gt='git tag'
alias g:='git push -u origin master'
alias gn='git open'
#alias gu='git commit --amend'
alias ggf='git push -f'
alias g::='git_remote_add_origin_from_active_link'
# alias g="git"
alias gi='git init'
alias gl='git pull'
alias gcl='git clone'
alias g.='git add .'
alias ga='git add'
# alias gb='git branch'
alias gbd='git branch -d'
alias gg='git push'
#alias gr='git rm'
# alias gf='git fetch'
alias glp='git pull && git push'
alias grao='git remote add origin'
#alias gz='git discard'
#alias gr='git rm --cached -r'

# Undo your last commit, but don't throw away your changes
alias greset='git reset --soft HEAD^'

# Git Diff
alias gd='git diff'
alias gds='git diff --staged'
alias gdn='git diff --name-only'

# Git Status
alias gs='git status --short'
alias gss='git show --word-diff=color' # See changes made

