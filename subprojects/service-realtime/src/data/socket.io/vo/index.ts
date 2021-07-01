export enum ChatEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  JOIN = 'join',
  LIST = 'list',
  LEAVE = 'leave',
}

export enum FeedEvent {
  CONNECT = 'connect',
  POST = 'post',
  PUTLIKE = 'putlike',
  PUTDISLIKE = 'putdislike',
  PUTDELETE = 'putdelete',
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
