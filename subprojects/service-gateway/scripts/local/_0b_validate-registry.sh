#!/bin/bash

FILE_PATH='./network/registry.list'
EL_NAME='registry'
if [ -z $1 ] ; then
    LIST=`cat $FILE_PATH`
  else 
    LIST="$1"
fi
BANNER="   check variable: $EL_NAME    "

REGEX=$(echo '^[0-9]+$')
ERR_MSG='registry.list should contain only numbers'

echo -e "\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎ check variable: $EL_NAME ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n"
echo -e "▶︎ validating $EL_NAME\n"
[ -z $1 ] && echo -e "  File Path: '$FILE_PATH'\n"

for EL in $LIST; do
  echo -e "  valid $EL_NAME: '$EL'\n"

  if ! [[ $EL =~ $REGEX ]] ; then
    echo $ERR_MSG >&2; exit 1
  fi
done

REGISTRY=$LIST

# echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎ check variable: registry ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
# REGISTRY_LIST=`cat ./network/registry.list`
# echo -e "▶︎ validating registry number\n"
# regex=$(echo '^[0-9]+$')
# for REGISTRY in $REGISTRY_LIST; do
#   echo -e "  valid registry number: '$REGISTRY'"
#   if ! [[ $REGISTRY =~ $regex ]] ; then
#     echo "registry.list should contain only numbers ranging from 0 to 9000" >&2; exit 1
#   fi
# done

