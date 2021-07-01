#!/bin/bash

[ -z $PRIVATE_KEY_PATH ] && PRIVATE_KEY_PATH="/home/yoonsung0711/.ssh/id_rsa"
source ./scripts/remote/_0a_validate-port.sh && PORT=$PORT_LIST
source ./scripts/remote/_0b_validate-server.sh $1 && IP=$SERVER_LIST

PROJECT="service-gateway"
PROJECT_HOME=$(pwd)

USER_ID=yoonsung0711
FILE_NAME=gateway

DEPLOY_PATH=/home/yoonsung0711/feeds/$PROJECT
FILE_PATH=$PROJECT_HOME/$FILE_NAME.tar.gz
DATE_TIME=`date +%Y-%m-%d-%H-%M-%S`

if [ "$PROD" == true ]; then
        PROJECT_FILES=$(echo "bin cli config network scripts settings src tsconfig.json package.deploy.json .npmrc.server")
    else
        PROJECT_FILES=$(echo "bin cli config network scripts settings src tsconfig.json package.deploy.json .npmrc.local")
fi

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎  compress project files  ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
rm $FILE_NAME.tar.gz 2> /dev/null
tar czf $FILE_NAME.tar.gz $PROJECT_FILES 
echo -e "▶︎ compressed\n"
echo -e "  files: $PROJECT_FILES\n"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎     reset deploy path    ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
echo -e "▶︎ create deploy path\n"
echo -e "  path: $DEPLOY_PATH\n"
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "rm -rf $DEPLOY_PATH"
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "mkdir -p $DEPLOY_PATH"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   copy compressed file   ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
echo -e "▶︎ copy compressed file\n"
echo -e "  file: ${PROJECT}_${DATE_TIME}.tar.gz\n"
scp -i $PRIVATE_KEY_PATH $FILE_PATH $USER_ID@$IP:$DEPLOY_PATH/${PROJECT}_${DATE_TIME}.tar.gz &>/dev/null

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎     decompress files     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
echo -e "▶︎ decompressed\n"
echo -e "  path: $DEPLOY_PATH\n"
echo -e "  files: $PROJECT_FILES\n"
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "tar zxf $DEPLOY_PATH/${PROJECT}_${DATE_TIME}.tar.gz -C $DEPLOY_PATH"
[ "$PROD" == true ] && ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "(mv $DEPLOY_PATH/.npmrc.server $DEPLOY_PATH/.npmrc)" || ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "(mv $DEPLOY_PATH/.npmrc.local $DEPLOY_PATH/.npmrc)"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   install dependencies   ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "mv $DEPLOY_PATH/package.deploy.json $DEPLOY_PATH/package.json"
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP ". ~/.nvm/nvm.sh && (cd $DEPLOY_PATH && yarn install)"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎     clean up process     ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP ". ~/.nvm/nvm.sh && (cd $DEPLOY_PATH && yarn stop)"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎       start server       ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
# ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP ". ~/.nvm/nvm.sh && (cd $DEPLOY_PATH && DOMAIN=http://$IP nohup yarn start > /dev/null 2>&1 &)"
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP ". ~/.nvm/nvm.sh && (cd $DEPLOY_PATH && DOMAIN=$DOMAIN nohup yarn start > /dev/null 2>&1 &)"

[ "$PROD" == true ] && bash ./scripts/remote/_0c_health-check-remote.sh 192.168.200.120 $PORT || bash ./scripts/remote/_0c_health-check-remote.sh $IP $PORT 
# bash ./scripts/remote/_0c_health-check-remote.sh $IP $PORT
