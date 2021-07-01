#!/bin/bash

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎     check run process    ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
for IP in $SERVER_LIST; do
  for PORT in $PORT_LIST; do
    PID="$(ssh $USER_ID@$IP lsof -i :$PORT | awk '{print $2}' | tail -n 1)"

    if [ -z "$PID" ]; then
        CUR_PORT=0
        PID=0
      continue
    else
        CUR_PORT=$PORT
      break
    fi
  done
done

if [ $CUR_PORT -ne 0 ]; then
    echo -e "▶︎ running server info\n"
    echo -e "  port: $PORT\n"
    echo -e "  process: $PID\n"
    for PORT in $PORT_LIST; do
        if [ $PORT -ne $CUR_PORT ]; then 
            NEXT_PORT=$PORT
        fi
    done
  else
    echo -e "▶︎ no server is running\n"
    NEXT_PORT="$(echo $PORT_LIST | awk '{print $1}')"
fi