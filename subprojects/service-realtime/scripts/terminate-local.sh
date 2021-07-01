#!/bin/bash

source ./scripts/local/_0a_validate-port.sh
source ./scripts/local/_1a_check-port-and-run-process.sh

if [ -z $1 ]; then
    source ./scripts/local/_4a_stop-current-server.sh
elif [ $1 = true ]; then
    source ./scripts/local/_4b_stop-current-server.sh
fi