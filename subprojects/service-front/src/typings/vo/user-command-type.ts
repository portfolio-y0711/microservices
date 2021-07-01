interface IUserCommand {
  command: string
  subject: string
}
export enum IUserCommandType {
  FOLLOW_FRIEND = 'follow_friend_feed',
  UNFOLLOW_FRIEND = 'unfollow_friend_feed',
  NO_SUCH_COMMAND = 'no_such_command',
}

export const iUserCommandMap: Map<string, IUserCommand> = new Map([
  [
    IUserCommandType.FOLLOW_FRIEND,
    {
      command: 'follow',
      subject: 'feed',
    },
  ],
  [
    IUserCommandType.UNFOLLOW_FRIEND,
    {
      command: 'unfollow',
      subject: 'feed',
    },
  ],
])
