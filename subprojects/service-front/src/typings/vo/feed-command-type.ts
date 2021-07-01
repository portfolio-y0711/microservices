interface IFeedCommand {
  commandType: string
}

export enum IFeedCommandType {
  PUT_LIKE_ON_FEED = 'feed_like_comment',
  PUT_DISLIKE_ON_FEED = 'feed_dislike_comment',
  PUT_ADD_COMMENT_ON_FEED = 'feed_add_comment',
  NO_SUCH_COMMAND = 'no_such_command',
}

export const iFeedCommandMap: Map<string, IFeedCommand> = new Map([
  [
    IFeedCommandType.PUT_LIKE_ON_FEED,
    {
      commandType: 'feed_like_comment',
    },
  ],
  [
    IFeedCommandType.PUT_DISLIKE_ON_FEED,
    {
      commandType: 'feed_dislike_comment',
    },
  ],
  [
    IFeedCommandType.PUT_ADD_COMMENT_ON_FEED,
    {
      commandType: 'feed_add_comment',
    },
  ],
])
