#!/bin/sh

# Set reasonable macOS defaults.
# Inspired by: https://github.com/mathiasbynens/dotfiles
# More commands here: https://gist.github.com/brandonb927/3195465

# If not ran on macOS, exit
if [ "$(uname -s)" != "Darwin" ]; then
	exit 0
fi

set +e

# Enable key repeat (https://www.howtogeek.com/267463/how-to-enable-key-repeating-in-macos/). Requires restart.
defaults write -g ApplePressAndHoldEnabled -bool false
echo 'Enabled fast key repeat.'

echo 'Some commands here require restart! Please do that for them to take effect.'
