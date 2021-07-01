#!/bin/bash

source ./scripts/local/_0a_validate-port.sh
source ./scripts/local/_0b_validate-registry.sh
source ./scripts/local/_1a_check-port-and-run-process.sh
source ./scripts/local/_1b_wait-until-registry-run.sh
source ./scripts/local/_2_start-new-server-with-newport.sh
source ./scripts/local/_3_health-check-terminate.sh
