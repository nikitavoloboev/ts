{ config, pkgs, ... }:

{
  # List packages installed in system profile. To search by name, run:
  # $ nix-env -qaP | grep wget
  environment.systemPackages =
    [
      pkgs.vim
      pkgs.postgresql
      pkgs.antibody
      pkgs.bat
      # pkgs.clog-cli
      pkgs.gitAndTools.diff-so-fancy
      pkgs.direnv
      pkgs.exa
      pkgs.fzf
      pkgs.git
      pkgs.httpie
      pkgs.gitAndTools.git-hub
      pkgs.git
      pkgs.hugo
      #pkgs.kubectl
      pkgs.leiningen
      pkgs.loc
      pkgs.ocamlPackages.merlin
      pkgs.minikube
      pkgs.neovim
      pkgs.nodejs-10_x
      pkgs.cacert # ?
      pkgs.ripgrep
      pkgs.rustup
      pkgs.screenfetch
      pkgs.yarn
      pkgs.nix
    ];


    # TODO: remove & test more
  #nixpkgs.overlays = [(import ../../src/clones/overlay-example/overlay.nix)];

  # Auto upgrade nix package and the daemon service.
  services.nix-daemon.enable = true;
  nix.package = pkgs.nix;
  programs.zsh.enableCompletion = false;

  programs.zsh.enable = true;
  programs.zsh.promptInit = "";
  nix.nixPath = [
    "darwin-config=$HOME/.dotfiles/nix/darwin.nix"
    "nixpkgs=$HOME/src/clones/nixpkgs"
    "$HOME/.nix-defexpr/channels"
  ];
  # Extend PATH
  environment.systemPath = [ "/usr/local/go/bin:/usr/local/MacGPG2/bin" ];

  # Used for backwards compatibility, please read the changelog before changing.
  # $ darwin-rebuild changelog
  system.stateVersion = 3;

  # Generally set to total number of logical cores on the system. $(sysctl -n hw.ncpu)
  nix.maxJobs = 12;
  # Can cause instability in builds if more than 1
  nix.buildCores = 1;

  # TODO: create ~/.hushlogin file to supress login msg on new terminal sessions 
   
}
