#!/bin/bash

FILE_PATH='./network/port.list'
EL_NAME='port'
if [ -z $1 ] ; then
    LIST=`cat $FILE_PATH`
  else 
    LIST="$1"
fi
BANNER="   check variable: $EL_NAME    "

REGEX=$(echo '^[0-9]+$')
ERR_MSG='port.list should contain only numbers'

echo -e "\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   check variable: $EL_NAME   ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n"
echo -e "▶︎ validating $EL_NAME\n"
[ -z $1 ] && echo -e "  File Path: '$FILE_PATH'\n"

for EL in $LIST; do
  echo -e "  valid $EL_NAME: '$EL'\n"
  if ! [[ $EL =~ $REGEX ]] ; then
    echo $ERR_MSG >&2; exit 1
  fi
done

PORT_LIST=$LIST

# echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   check variable: port   ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
# PORT_LIST=`cat ./network/port.list`
# echo -e "▶︎ validating port number\n"
# regex=$(echo '^[0-9]+$')
# for PORT in $PORT_LIST; do
#   echo -e "  valid port number: '$PORT'"
#   if ! [[ $PORT =~ $regex ]] ; then
#     echo "port.list should contain only numbers ranging from 0 to 9000" >&2; exit 1
#   fi
# done


# echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   check varable: server  ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
# SERVER_LIST=`cat ./network/server.list`
# echo -e "▶︎ validating server address\n"
# regex='^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
# for SERVER in $SERVER_LIST; do
#   echo " ︎ valid server address: '$SERVER'"
#   if ! [[ $SERVER =~ $regex ]] ; then
#     echo "▶︎ server.list is not in valid form" >&2; exit 1
#   fi
# done
