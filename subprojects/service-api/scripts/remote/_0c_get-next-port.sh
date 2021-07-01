#!/bin/bash

CUR_PORT=0
for IP in $SERVER_LIST; do
  for PORT in $PORT_LIST; do
    HEALTH="$(curl -s $IP:$PORT/api/health)"
    RESULT=$(echo $HEALTH | grep 'up' | wc -l)

    if [ $RESULT -ge 1 ]; then
        CUR_PORT=$PORT
    fi
  done
done

if [ $CUR_PORT -ne 0 ]; then
    for PORT in $PORT_LIST; do
        if [ $PORT -ne $CUR_PORT ]; then 
            NEXT_PORT=$PORT
        fi
    done
    echo $NEXT_PORT
  else
    NEXT_PORT="$(echo $PORT_LIST | awk '{print $1}')"
    echo $NEXT_PORT
fi