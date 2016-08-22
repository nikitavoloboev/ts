#!/bin/bash
# onlyshk

for file in $(ls "$@"); do
  echo -n $(pwd)
  [[ $(pwd) != "/" ]] && echo -n /
  echo $file
done
