# Temp

# Nix
alias n='nix'
alias nr='nix repl'
alias R='darwin-rebuild switch'

# Nix shell
alias ns="nix-shell --run zsh"
alias nss="nix-shell --run zsh -p"

# Brew
alias bi='brew install'

# General
alias wjs='watchexec --exts js'
alias f='open .'
alias pb='pbcopy'
alias te='tree'
alias op='open'
#alias env='env | fzf'
alias cleanup="find . -type f -name '*.DS_Store' -ls -delete" # Recursively delete `.DS_Store` files
alias g='git' # Wrapper over git
alias peek='tee >(cat 1>&2)' # Mirror stdout to stderr, useful for seeing data going through a pipe
alias pubkey="more ~/.ssh/id_rsa.pub | pbcopy | echo 'public key copied to pasteboard'"
alias lc='tokei'
alias _='sudo'
alias ae='subl README.md'
alias aet='subl CONTRIBUTING.md'
alias yi="python -i"
alias le='less -r'
alias wifi='wifi-password -q'
# alias du='du -sh * | sort'
alias eo='echo'
alias es='elasticsearch'
alias mc='md-to-alfred'
alias pd='pandoc'
alias yt='yotube-dl'
alias r='rg'
alias alf='alfred'
alias d='cd'
alias lg='ls | grep'
alias so='source'
alias top='gotop'
alias ka='echo'
alias rl='curl'
alias how='howdoi'
alias ua='unalias'
alias m='mkdir'
alias mm='tldr'
alias ma='man'
# alias aw='k -h' TODO: ?
alias rec='asciinema rec'
alias dus='du -s'
alias to='touch'
alias t='bat'
alias zo='open'
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
# alias gr='goreleaser'

# Dev
alias ll='ln -s'
alias tm='task'
alias rf='reflex'
alias ser='serve'
alias cra='npx create-react-app'
alias lic='legit'

# App
#alias to.='gittower .' # Open current dir in Tower

# Python
alias p='python3'
alias p2='python2'

# Alfred
alias wf='alfred build'
alias wfl='alfred link'
alias wfa='alfred pack -o ~/Desktop'
alias ws='workflow-install -s workflow' # Symlink `source` directory

# Docker
alias c='docker'
alias cs='docker ps'
alias cu='docker-compose up'
# alias cr='docker rm'
# alias cc='docker compose'
# alias cg='docker logs'
# alias cgt='docker logs --tail 100'
# alias cs='docker ps'
# alias csq='docker ps -q'
# alias csa='docker ps -a'
# alias ck='docker kill'

# Kubernetes
alias k='kubectl'
alias kl='kubectl logs'
alias kf='kubectl logs -f' # Get logs for <pod> streaming in real time
alias kde='kubectl describe'
alias ke='kubectl explain'
alias kg='kubectl get'
alias ks='kubectl get pods'
alias kd='kubectl delete pods'
alias ksw='kubectl get pods -o=wide -w'
alias kp='kubectl port-forward'
#alias kbcontexts='kubectl config view -o jsonpath='{.contexts[*].name}'' # List kubernetes contexts

# Node
alias no='node'

# Yarn
alias ja='yarn add'
alias jt='yarn test'
alias jr='yarn run'
alias je='yarn remove'
alias js='yarn start'
alias jde='yarn run dev'
alias jg='yarn global add'
alias jd='yarn add --dev'

# Go
alias o='go'
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
alias hu='hugo'
alias hug='hugo server -D'
alias huw='hugo server -w' # testing

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

alias cpu='top -o cpu'   # CPU
alias mem='top -o rsize' # Memory

# Apps
alias can="open -a Google\ Chrome\ Canary"
alias saf="open -a Safari"

# Edit configs
alias ew='nvim ~/.dotfiles/nvim/init.vim' # nvimrc
alias essh='nvim ~/.ssh/config' # ssh config
alias ek='nvim ~/.dotfiles/karabiner/karabiner.edn'
alias ez='nvim ~/.zshrc'

# cd places
alias doc='cd ~/Documents/'
alias ds='cd ~/.ssh'
alias dk='cd ~/Dropbox/Write/knowledge'
alias dn='cd ~/src/clones'
alias di='cd ~/src/ideas'
alias dg='cd ~/go/src/github.com/nikitavoloboev'
alias dl='cd ~/src/build-to-learn'
alias dv='cd ~/src/test'
alias dm='cd ~/src/games'
alias da='cd ~/src/'
alias dr='cd ~/src/alfred'
alias dla='cd ~/src/orgs/learn-anything'
alias dz='cd ~/.dotfiles'
alias de='cd ~/Desktop'
alias dq='cd ~/Downloads'
alias dls='cd ~/Library/Services'
alias drp='cd ~/Dropbox'
alias dbin='cd /usr/local/bin/'

# Xcode
alias dx='cd ~/src/Xcode'
alias dxi='cd ~/src/Xcode/iOS'
alias dxm='cd ~/src/xcode/macOS'

# Config
alias d..='cd ~/.config'
alias db='cd ~/.dotfiles/bin'
alias dh='cd ~/.hammerspoon'

# Utilities
alias ungit="find . -name '.git' -exec rm -rf {} \;" # Remove git from a project
alias gto='gittower'

# Git
alias gj='open `git config remote.origin.url`'
alias gm='git branch -m' # Rename current branch
alias ger='git checkout -' # Checkout last branch you were on
alias grl='git reset --hard && git clean -df' # Reset to exact state as last commit
alias grhf='git checkout HEAD --' # Git reset single file
alias gf='git log --pretty=oneline --abbrev-commit --graph --decorate'
alias gpm="git push origin master"
alias gfk='git fetch && git reset --hard && git clean -dfx' # Reset repo to clean remote state
alias gsp='git pull --rebase --autostash' # Git stash, pull and apply stash
alias gu='git issues'
alias gdp='git reset --hard HEAD~; git push --force-with-lease' # Delete previous commit locally and remote
alias gpd="git push origin develop"
alias ggh='push -u origin HEAD'
alias gre='git rebase -i HEAD~4'
alias gS='git stash'
alias gqa='git stash apply'
alias gb='git checkout -b'
alias gr='git reset --hard'
alias grc='git rm --cached'
alias ggn='git_add_origin_and_origin_push'
# alias gt='git tag'
alias g:='git push -u origin master'
#alias gu='git commit --amend'
alias ggf='git push -f'
alias g::='git_remote_add_origin_from_active_link'
# alias g="git"
alias gi='git init'
alias gl='git pull'
alias gn='git clone'
alias g.='git add .'
alias ga='git add'
# alias gb='git branch'
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

