#!/bin/bash

case $1 in
  dev)
    node -p "JSON.stringify({ baseUrl: 'http://localhost:8000' })" > ./src/db/config/index.json
    node -p "JSON.stringify({ baseUrl: 'http://localhost:3000' })" > ./src/socket/config/index.json
    ;;
  stage)
    node -p "JSON.stringify({ baseUrl: 'http://stage:8000' })" > ./src/db/config/index.json
    node -p "JSON.stringify({ baseUrl: 'http://stage:3000' })" > ./src/socket/config/index.json
    ;;
  prod)
    node -p "JSON.stringify({ baseUrl: 'http://portfolio-y0711.com:8000' })" > ./src/db/config/index.json
    node -p "JSON.stringify({ baseUrl: 'http://portfolio-y0711.com:3000' })" > ./src/socket/config/index.json
    ;;
  *)
    echo "not valid params; provide one of 'dev'/'stage'/'prod'"
    ;;
esac

