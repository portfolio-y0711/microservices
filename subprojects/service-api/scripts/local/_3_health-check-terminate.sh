#!/bin/bash

sleep 8

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎ health check & terminate ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
echo -e "▶︎ new server health check\n"

for retry in {1..6}
  do
    echo -e "  NEXT PORT: $NEXT_PORT\n"
    HEALTH=$(curl -s http://localhost:$NEXT_PORT/api/health)
    RESULT=$(echo $HEALTH | grep 'up' | wc -l)
    echo -e "  check count: $RESULT\n"
    if [ $RESULT -ge 1 ]; then
        echo -e "  new server started\n"

        if [ $PID -ne 0 ]; then

          if [ -n $ZSH_VERSION ]; then
              printf $'\e[31m\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      stopping server     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n\n'
            else
              echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      stopping server     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
          fi

          echo -e "▶︎ stop running process\n"
          kill -15 $PID
          echo -e "  port: $CUR_PORT\n"
          echo -e "  process: $PID\n"

          if [ -n $ZSH_VERSION ]; then
              echo -e $'\e[0m'
          fi

        fi

      break
    fi
    sleep 10
    echo "......"
done
