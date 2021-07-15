import { Feed, IFeed } from '@feed/data/database/typeorm/entities';

export const normalize = (feed: IFeed): Feed => {

  let _likers,
    _dislikers,
    _childrenlist

  if (typeof feed.likers == 'string') {
    if (feed.likers == '') {
      _likers = []
    } else {
      _likers = feed.likers.split(',')
    }
  }

  if (typeof feed.dislikers == 'string') {
    if (feed.dislikers == '') {
      _dislikers = []
    } else {
      _dislikers = feed.dislikers.split(',')
    }
  }

  if (typeof feed.childrenlist == 'string') {
    if (feed.childrenlist == '') {
      _childrenlist = []
    } else {
      _childrenlist = feed.childrenlist.split(',')
    }
  }

  const result = {
    feedId: feed.feedId,
    msg: feed.msg,
    uuid: feed.uuid,
    writerUid: feed.writerUid,
    createdAt: feed.createdAt,
    likers: feed.likers || _likers,
    dislikers: feed.dislikers || _dislikers,
    childrenlist: feed.childrenlist || _childrenlist,
    parentUid: feed.parentUid
  }
  return result
}