#!/bin/bash

FILE_PATH='./network/server.list'
EL_NAME='server'

if [ -z $1 ] ; then
    LIST=`cat $FILE_PATH`
  else 
    LIST="$1"
fi
BANNER="   check variable: $EL_NAME    "

REGEX='^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
ERR_MSG='server.list is not in valid form'

echo -e "\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   check varable: $EL_NAME  ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n"
echo -e "▶︎ validating $EL_NAME\n"
echo -e "  File Path: '$FILE_PATH'\n"

for EL in $LIST; do
  echo -e "  valid $EL_NAME: '$EL'\n"
  if ! [[ $EL =~ $REGEX ]] ; then
    echo "▶︎ server.list is not in valid form" >&2; exit 1
  fi
done

SERVER_LIST=$LIST