export enum ChatCmdEvent {
  MESSAGE = 'message',
  JOINCHAT = 'joinChat',
  LEAVECHAT = 'leave',
}

export enum ChatEvent {
  MESSAGE = 'message',
  MESSAGES = 'messages',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  USERLIST = 'userlist',
}

export enum CommonEvent {
  JOINROOM = 'joinRoom',
  POSTUPDATED = 'postupdated',
  FEEDUPDATED = 'feedupdated',
}

export enum FeedEvent {
  CONNECT = 'connect',
  POST = 'post',
  PUTLIKE = 'putlike',
  PUTDISLIKE = 'putdislike',
  PUTDELETE = 'putdelete',
  POSTADDCOMMENT = 'postaddcomment',
  POSTSAVED = 'postsaved',
  DISCONNECT = 'disconnect',
}

export enum UserEvent {
  CONNECT = 'connect',
  TOGGLEFOLLOW = 'toggleFollow',
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
  USERUPDATED = 'userupdated',
  DISCONNECT = 'disconnect',
}
