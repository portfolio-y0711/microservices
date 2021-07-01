#!/bin/bash

[ -z $1 ] && PRIVATE_IP="127.0.0.1" || PRIVATE_IP="$1" 

PORT_LIST=`cat ./network/port.list`
regex=$(echo '^[0-9]+$')
for PORT in $PORT_LIST; do
  if ! [[ $PORT =~ $regex ]] ; then
    echo "port.list should contain only numbers ranging from 0 to 9000" >&2; exit 1
  fi
done

echo $PROD

# for retry in {1..6}; do
    for PORT in $PORT_LIST; do
        HEALTH="$(curl -s $PRIVATE_IP:$PORT/api/health)"
        RESULT=$(echo $HEALTH | grep 'up' | wc -l)

      if [ $RESULT -ge 1 ]; then
          CUR_PORT=$PORT
          echo -e "▶︎ server is running\n"
          if [[ $PROD = true ]] ; then
              echo -e "  ip: $(echo `cat ./network/server.list`)\n"
            else
              :
          fi
          echo -e "  private ip: $PRIVATE_IP\n"
          echo -e "  port: $PORT\n"
          exit 0
          break
      fi

    done
    # sleep 1
    # echo "......"
# done

if [ $RESULT -ge 0 ]; then
    CUR_PORT="-"
    echo -e "▶︎ no server is running\n"
    if [[ $PROD = true ]] ; then
        echo -e "  ip: $(echo `cat ./network/server.list`)\n"
      else
        :
    fi
    echo -e "  private ip: $PRIVATE_IP\n"
    echo -e "  port: $CUR_PORT\n"
    # exit 1
fi
