#!/bin/bash

[ -z $1 ] && echo "no ip address is not is provided" >&2 && exit 1
[ -z $2 ] && echo "no port number is not provided" >&2 && exit 1

IP=$1
PORT=$2

RESULT=0
for retry in {1..6}
  do
    HEALTH="$(curl -s $IP:$PORT/api/health)"
    RESULT=$(echo $HEALTH | grep 'up' | wc -l)

    if [ $RESULT -ge 1 ]; then
        CUR_PORT=$PORT
        echo -e "▶︎ new server started\n"
        echo -e "  ip: $IP\n"
        echo -e "  port: $PORT\n"
        exit 0
        break
    fi
    sleep 10
    echo "......"
done
