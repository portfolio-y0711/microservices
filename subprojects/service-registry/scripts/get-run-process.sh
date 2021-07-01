#!/bin/bash
[ -z $1 ] && PRIVATE_IP="127.0.0.1" || PRIVATE_IP="$1" 

FILE_PATH='./network/port.list'
PORT_LIST=`cat $FILE_PATH`

REGEX=$(echo '^[0-9]+$')
ERR_MSG='port.list should contain only numbers'

for PORT in $PORT_LIST; do
  if ! [[ $PORT =~ $REGEX ]] ; then
    echo $ERR_MSG >&2; exit 1
  fi
done

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
