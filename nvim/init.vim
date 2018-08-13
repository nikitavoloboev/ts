" Autocomplete engine
function! DoRemote(arg)
  UpdateRemotePlugins
endfunction

" Install plugins
call plug#begin()
" Looks
Plug 'nikitavoloboev/monokai-vim' " Theme
Plug 'itchyny/lightline.vim' " Light and configurable statusline/tabline plugin.

" Utility
Plug 'romainl/vim-cool' " Stop matching after search is done.
Plug 'jiangmiao/auto-pairs' " Insert or delete brackets, parens, quotes in pair.
Plug 'w0rp/ale' " Asynchronous Lint Engine.
Plug 'honza/vim-snippets' " Snippet files for various programming languages.
Plug 'sbdchd/neoformat' " Format code.
Plug 'rizzatti/dash.vim' " Search Dash app.
Plug 'jremmen/vim-ripgrep' " Use RipGrep in Vim and display results in a quickfix list.

" Prettier support
Plug 'prettier/vim-prettier', {
  \ 'do': 'npm install',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue'] }

Plug 'scrooloose/nerdcommenter' " Quick comments.
Plug 'unblevable/quick-scope' " Highlight f, F jumps.
Plug 'Shougo/vimproc.vim', {'do' : 'make'} " Interactive command execution.
Plug 'tpope/vim-repeat' " Enable repeating supported plugin maps.
Plug 'tpope/vim-surround' " Quoting/parenthesizing made simple.
Plug 'junegunn/vim-easy-align' " Simple, easy-to-use alignment.
Plug '~/.fzf' " Fzf search. TODO: install with homebrew or nix instead
Plug 'junegunn/fzf.vim' " Fzf search.
Plug 'wakatime/vim-wakatime' " Automatic time tracking.
Plug 'haya14busa/incsearch.vim' " Improved incremental searching.
Plug 'easymotion/vim-easymotion' " Vim motions on speed.
Plug 'thinca/vim-quickrun' " Run commands quickly.

" Git
Plug 'tpope/vim-fugitive' " Git wrapper.
Plug 'mhinz/vim-signify' " Show a diff using Vim its sign column.

" Deoplete
Plug 'Shougo/deoplete.nvim', { 'do': function('DoRemote') } " Asynchronous completion framework.
Plug 'zchee/deoplete-jedi' " Deoplete source for jedi.

" Vim
Plug 'Shougo/neco-vim', { 'for': 'vim' } " Vim source for neocomplete/deoplete.

" Nix
Plug 'LnL7/vim-nix', { 'for': 'nix' } " Vim configuration files for Nix.
call plug#end()

" Options
set mouse=a " Copy selected text with mouse to system clipboard
set undofile " Save undos after file closes
set wildmode=longest:list,full " Complete longest common string, then each full match
set updatetime=250 " If this many milliseconds nothing is typed the swap file will be written to disk
set visualbell " Turn off the audio bell
set clipboard^=unnamed  " Copy text to system clipboard
set gdefault " Always do global substitutions
set title " Set terminal title
set whichwrap+=<,>,[,]
set completeopt-=preview " No annoying scratch preview above
set expandtab " Spaces on tabs
set shiftwidth=4
set softtabstop=2
set undolevels=1000
set smartindent " Indentation
set shortmess=Ia " Disable startup message
set fileencoding=utf-8 " Encoding when written to file
set fileformat=unix " Line endings
set timeout timeoutlen=1000 ttimeoutlen=10 " TODO: ?
set autowrite " Automatically save before :next, :make etc
set ignorecase " Search case insensitive:
set smartcase " .. but not when search pattern contains upper case characters
set nocursorcolumn
set nocursorline
set wrap
set textwidth=79
set formatoptions=qrn1
set notimeout
set ttimeout
set ttimeoutlen=10
set nobackup " Don't create annoying backup files
set path=+** " Search down into subfolders

" Folding
set foldcolumn=1
set foldlevel=20
set foldlevelstart=7
set foldmethod=syntax
set foldignore=""
set nofoldenable

" Buffers
set hidden

" Searching
set wrapscan
set ignorecase
set smartcase
set gdefault

" Usable 'Tab'
set shiftwidth=4
set tabstop=4
set softtabstop=4
set expandtab

" UI
set cursorline  " Highlight current line
set showmatch
set tabstop=4 " Default indentation is 4 spaces long and uses tabs, not spaces
set matchtime=2
set termguicolors " Enable true colors support
let python_highlight_all = 1

set completeopt+=menu,menuone " Completion

let $NVIM_TUI_ENABLE_TRUE_COLOR=1 " True color
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o

" Open help vertically
command! -nargs=* -complete=help Help vertical belowright help <args>
autocmd FileType help wincmd L

:autocmd InsertEnter,InsertLeave * set cul! " Notify on mode change visually

set grepprg=rg\ --vimgrep
set grepformat^=%f:%l:%c:%m

set viewoptions=cursor,slash,unix

" Plugins
let g:deoplete#enable_at_startup = 1 " Activate deoplete
let g:qs_highlight_on_keys = ['f', 'F', 't', 'T'] " Trigger a highlight in the appropriate direction when pressing these keys
let g:incsearch#auto_nohlsearch = 1 " TODO

" Theme
colorscheme monokai

" Bufferline
let g:bufferline_echo = 0

" Called once right before you start selecting multiple cursors
function! Multiple_cursors_before()
    if exists('g:deoplete#disable_auto_complete')
        let g:deoplete#disable_auto_complete = 1
    endif
endfunction

" Called once only when the multiple selection is canceled (default <Esc>)
function! Multiple_cursors_after()
    if exists('g:deoplete#disable_auto_complete')
        let g:deoplete#disable_auto_complete = 0
    endif
endfunction

let g:multi_cursor_exit_from_visual_mode = 0
let g:multi_cursor_exit_from_insert_mode = 0

let g:AutoPairsFlyMode = 0
let g:AutoPairsShortcutToggle = '<C-P>'
au filetype vim let b:AutoPairs = {'(':')', '[':']', '{':'}',"'":"'", '`':'`'} " Don't autocomplete in vim

" Vim session
let g:session_autosave="no"
let g:session_autoload="no"

" Autocomplete with tab
inoremap <expr><TAB>  pumvisible() ? "\<C-n>" : "\<TAB>"
" Activate leader for easymotion
map <Leader> <Plug>(easymotion-prefix)

" Advanced customization using autoload functions
inoremap <expr> <c-x><c-k> fzf#vim#complete#word({'left': '15%'})

" Start interactive EasyAlign in visual mode (e.g. vipga)
xmap ga <Plug>(EasyAlign)

" Start interactive EasyAlign for a motion/text object (e.g. gaip)
nnoremap ga <Plug>(EasyAlign)

" _Insert mappings
inoremap      jk  <Esc>
inoremap      kj  <Esc>
inoremap      (;   ();<Esc>o
inoremap      ()   ()

"Command mappings
cabbrev rp Rp

" CTRL mappings
nnoremap <C-M> /sticky 
nnoremap <C-L> :Files<CR>
nnoremap <C-O> /\c__\_sKeyCode::/e<Left><Left>

" Space mappings
nnoremap <SPACE> <Nop>
let mapleader="\<Space>"
let maplocalleader = "\<Space>"
nnoremap <leader>= yypVr=

" Space z
nmap <Leader>ze   :enew <CR>
nmap <Leader>zt   :tabnew<CR>

" Space p
nnoremap <Leader>pi :PlugInstall<CR>
nnoremap <Leader>pu :PlugUpdate<CR>

" Space w
" Save
"nmap <Leader>w :w<CR>
nmap <Leader>w :w<CR>

" Space k
nmap <leader>kk :norm! ikey("", "", "", []),<esc>F(la
nmap <leader>ks :norm! ishell('', '', ),<esc>F(la

" Space e
"nmap <Leader>e <Plug>(Prettier) :w<CR>

" Space e
" nmap <Leader>e.   :e .<CR>
" Search files inside current dir
" nnoremap <Leader>e :Files<CR>

" Space d
nmap <Leader>d :bd<CR>

" Space a
nnoremap <Leader>a :wq<CR>

" Space v
" Write all changed buffers and exit vim
nnoremap <Leader>vq :wqall<CR>
nnoremap <Leader>vQ :qa<CR>
nnoremap <Leader>vm :make<CR>

" Space o
" Move 10 lines down (for karabiner sticky keys)
nnoremap <Leader>o 29jzz

" Space i
nnoremap <Leader>ii :PlugInstall<CR>
" Update plugins
nnoremap <Leader>iu :PlugUpdate<CR>
" Check vim health
nnoremap <Leader>ih :CheckHealth<CR>

" Space c
" Switch dir for fzf searching to current dir
map <Leader>cd :lcd %:p:h<CR>

" Space l
" Yank xml block to next line
nnoremap <Leader>l vat:t'><CR>'[<Esc><CR>

" Space t
nmap <Leader>to   :e %:p:h<CR>
" Yank function block
nnoremap <Leader>tgt :exe search('^function','cb')';/}/y'<CR>
" Dash doc lookup
nnoremap <Leader>ttt :Dash<CR>
" Write all changed buffers
nnoremap <Leader>tttt :wa<CR>
" Run commands in new splits
nnoremap <Leader>tt :tabedit <Bar> term.
nnoremap <Leader>ts :split <Bar> term.
nnoremap <Leader>tv :vsplit <Bar> term.

" Space s
" Buffer control
nmap <Leader>s    :bprevious<CR>
" Source vimrc
nnoremap <Leader>ss :source ~/.dotfiles/nvim/init.vim<CR>

" Space n
nmap <Leader>n    :bnext<CR>
" Search lines with fzf
nnoremap <silent> <Leader>n :Lines<CR>

" Space q
nmap <Leader>q    :q<CR>

" Space y
" Yank whole file
nnoremap <Leader>y :%y<CR>

" Space f
nmap <Leader>fw   :Autoformat<CR>
nmap <Leader>ff :FZF <CR>
nmap <Leader>fb   :Buffers <CR>
nmap <Leader>fl   :BLines <CR>
nmap <Leader>fL   :Lines <CR>
nmap <Leader>fh   :History<CR>
nmap <Leader>f;   :History:<CR>
nmap <Leader>f:   :Commands<CR>
nmap <Leader>ft   :BTags<CR>
nmap <Leader>fT   :Tags<CR>
nmap <Leader>fm   :Marks<CR>
nmap <Leader>fw   :Windows<CR>
nmap <Leader>fs   :Snippets<CR>
nmap <Leader>fg   :BCommits<CR>
nmap <Leader>fG   :Commits<CR>

" Space o
nmap <Leader>o    :Files %:p:h<CR>
nmap <Leader>O    :GFiles <CR>

" Mapping selecting mappings
nnoremap <leader><tab> <plug>(fzf-maps-n)
xmap <leader><tab> <plug>(fzf-maps-x)
omap <leader><tab> <plug>(fzf-maps-o)

" Insert mode completion
imap <c-x><c-k> <plug>(fzf-complete-word)
imap <c-x><c-f> <plug>(fzf-complete-path)
imap <c-x><c-j> <plug>(fzf-complete-file-ag)
imap <c-x><c-l> <plug>(fzf-complete-line)

" For conceal markers
if has('conceal')
    set conceallevel=2 concealcursor=nc
endif

" Auto commands
au FileType dirvish call fugitive#detect(@%)
au FocusLost * :wa " Auto save everything

" Remaps
" Search and replace
xnoremap gs y:%s/<C-r>"//g<Left><Left>

" Yank a line with Y.
nnoremap Y y$

" Functions

" Other
set guicursor=n-v-c:hor20,i-ci:ver20 " Make cursor block in insert mode and underline in normal mode
autocmd VimLeave * set guicursor=a:ver25-blinkon25 " Make cursor block when leaving to shell

" Testing
set signcolumn=yes
nnoremap <C-q> :q<cr>:q<cr>
set foldcolumn=0 " Remove sidebar column
