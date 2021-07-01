#!/bin/bash

[ -z $1 ] && echo "no ip address is not is provided" >&2 && exit 1
[ -z $2 ] && echo "no port number is not provided" >&2  && exit 1

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
    sleep 15
    echo "......"
done


# if [ -z $1 ]; then
#   RUN_PORT=0
#   echo "no port number is provided"
#   else 
#   RUN_PORT=$1
# fi

# PORT_LIST=`cat ./network/port.list`
# regex=$(echo '^[0-9]+$')
# for PORT in $PORT_LIST; do
#   if ! [[ $PORT =~ $regex ]] ; then
#     echo "port.list should contain only numbers ranging from 0 to 9000" >&2; exit 1
#   fi
# done


# PRIVATE_IP=(http://192.168.200.120)
# RESULT=0

# for retry in {1..6}
#   do
#     for PORT in $PORT_LIST; do
#       if [ $PORT -ne $RUN_PORT ]; then
#           HEALTH="$(curl -s $PRIVATE_IP:$PORT/api/health)"
#           echo "$PRIVATE_IP:$PORT/api/health"
#           RESULT=$(echo $HEALTH | grep 'up' | wc -l)
#           echo $RESULT
#         else 
#           :
#       fi
#       if [ $RESULT -ge 1 ]; then
#           CUR_PORT=$PORT
#           echo -e "▶︎ new server started\n"
#           echo -e "  ip: $(echo `cat ./network/server.list`)\n"
#           echo -e "  port: $PORT\n"
#           exit 0
#           break
#       fi
#     done
#     sleep 15
#     echo "......"
# done
