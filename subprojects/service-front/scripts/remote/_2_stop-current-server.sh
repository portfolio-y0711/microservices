#!/bin/bash

for IP in $SERVER_LIST; do
  if [ $PID -ne 0 ]; then

    if [ -n $ZSH_VERSION ]; then
        printf $'\e[31m\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      stopping server     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n\n'
      else
        echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      stopping server     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
    fi

    echo -e "▶︎ stop running process\n"
    ssh $USER_ID@$IP kill -9 $PID
    echo -e "  port: $CUR_PORT"
    echo -e "  process: $PID"

    if [ -n $ZSH_VERSION ]; then
        echo -e $'\e[0m'
    fi

  fi
done