#!/bin/bash

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎  wait until registry run ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
echo -e "▶︎ new server health check\n"

IS_RUNNING=false
for retry in {1..20}
  do
    HEALTH=$(curl -s http://localhost:$REGISTRY/api/health)
    RESULT=$(echo $HEALTH | grep 'up' | wc -l)
    echo -e "  check count: $RESULT\n"
    if [ $RESULT -ge 1 ]; then
        echo -e "  registry server is running"
        IS_RUNNING=true
      break
    fi
    sleep 3
    echo "  ......"
done

if [ $IS_RUNNING = false ]; then
  echo -e "  registry server is not running"
  exit 1
fi

