#!/bin/bash

for SERVER in $SERVER_LIST; do
  if [ $PID -ne 0 ]; then

    if [ -n $ZSH_VERSION ]; then
        printf $'\e[31m\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      stopping server     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n\n'
      else
        echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      stopping server     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
    fi

    echo -e "▶︎ stop running process\n"
    ssh $USER_ID@$SERVER kill -15 $PID
    echo -e "  port: $CUR_PORT\n"
    echo -e "  process: $PID\n"

    if [ -n $ZSH_VERSION ]; then
        echo -e $'\e[0m'
    fi

  fi
done