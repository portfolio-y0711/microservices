#!/bin/bash

[ -z $PRIVATE_KEY_PATH ] && PRIVATE_KEY_PATH="/home/yoonsung0711/.ssh/id_rsa"
source ./scripts/remote/_0a_validate-port.sh && PORT=$PORT_LIST
source ./scripts/remote/_0b_validate-server.sh $1 && IP=$SERVER_LIST

PROJECT="service-front"
PROJECT_HOME=$(pwd)

USER_ID=yoonsung0711
FILE_NAME=front

DEPLOY_PATH=/home/yoonsung0711/feeds/$PROJECT
FILE_PATH=$PROJECT_HOME/$FILE_NAME.tar.gz
DATE_TIME=`date +%Y-%m-%d-%H-%M-%S`

if [ "$PROD" == true ]; then
        PROJECT_FILES=$(echo "bin build network scripts tsconfig-server.json package.deploy.json .npmrc.server")
    else
        PROJECT_FILES=$(echo "bin build network scripts tsconfig-server.json package.deploy.json .npmrc.local")
fi

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎  compress project files  ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
rm $FILE_NAME.tar.gz 2> /dev/null
tar czf $FILE_NAME.tar.gz $PROJECT_FILES 
echo -e "▶︎ compressed\n"
echo -e "  files: $PROJECT_FILES"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎    create deploy path    ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
echo -e "▶︎ create deploy path\n"
echo -e "  path: $DEPLOY_PATH"

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
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "(mv $DEPLOY_PATH/tsconfig-server.json $DEPLOY_PATH/tsconfig.json)"

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎   install dependencies   ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP "mv $DEPLOY_PATH/package.deploy.json $DEPLOY_PATH/package.json"
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP ". ~/.nvm/nvm.sh && (cd $DEPLOY_PATH && yarn)"

export SERVER_LIST; export PORT_LIST
NEXT_PORT=$(bash ./scripts/remote/_0c_get-next-port.sh)
unset SERVER_LIST; unset PORT_LIST

echo -e '\n◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎      start server        ◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎◼︎\n'
ssh -i $PRIVATE_KEY_PATH $USER_ID@$IP ". ~/.nvm/nvm.sh && (cd $DEPLOY_PATH && nohup yarn start > /dev/null 2>&1 &)"

[ "$PROD" == true ] && bash ./scripts/remote/_0d_health-check-remote.sh 192.168.200.120 $NEXT_PORT || bash ./scripts/remote/_0d_health-check-remote.sh $IP $NEXT_PORT 
# source ./scripts/remote/_0d_health-check-remote.sh $IP $NEXT_PORT