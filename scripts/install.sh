#!/usr/bin/env bash

# This is part of a larger script for setting a mac for python development.
set -e

pretty_print() {
  printf "\n%b\n" "$1"
}
#
pretty_print "Here we go..."


if ! command -v brew &>/dev/null; then
  pretty_print "Installing Homebrew, an OSX package manager, follow the instructions..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  pretty_print "You already have Homebrew installed...good job!"
fi

pretty_print "Installing node"
  	brew install node

pretty_print "Installing git"
  	brew install git
