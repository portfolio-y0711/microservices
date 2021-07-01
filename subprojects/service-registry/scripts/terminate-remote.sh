#!/bin/bash
USER_ID=yoonsung0711

source ./scripts/remote/_0a_validate-port.sh
source ./scripts/remote/_0b_validate-server.sh $1
source ./scripts/remote/_1_check-ip-port-and-run-process.sh $1
source ./scripts/remote/_2_stop-current-server.sh
