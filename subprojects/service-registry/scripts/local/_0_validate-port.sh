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

echo -e "\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎  check variable: $EL_NAME  ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n"
echo -e "▶︎ validating $EL_NAME\n"
[ -z $1 ] && echo -e "  File Path: '$FILE_PATH'\n"

for EL in $LIST; do
  echo -e "  valid $EL_NAME: '$EL'\n"

  if ! [[ $EL =~ $REGEX ]] ; then
    echo $ERR_MSG >&2; exit 1
  fi
done

PORT_LIST=$LIST