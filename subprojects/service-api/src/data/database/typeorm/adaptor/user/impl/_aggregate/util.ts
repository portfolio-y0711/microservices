import { IUser, User } from '@feed/data/database/typeorm/entities'

export const normalizeUser = (user: IUser): User => {
  let _leaders, 
    _followers, 
    _posts,
    _feeds

  if ((typeof user.leaders !== 'string')) {
    if (!Array.isArray(user.leaders)){
      throw Error('')
    }
  } else {
    if (user.leaders.length == 0) {
      _leaders = []
    } else {
      _leaders = user.leaders.split(',')
    }
  }

  if ((typeof user.followers !== 'string')) {
    if (!Array.isArray(user.followers)){
      throw Error('')
    }
  } else {
    if (user.followers.length == 0) {
      _followers = []
    } else {
      _followers = user.followers.split(',')
    }
  }

  if ((typeof user.posts !== 'string')) {
    if (!Array.isArray(user.posts)){
      throw Error('')
    }
  } else {
    if (user.posts.length == 0) {
      _posts = []
    } else {
      _posts = user.posts.split(',')
    }
  }

  if ((typeof user.feeds !== 'string')) {
    if (!Array.isArray(user.feeds)){
      throw Error('')
    }
  } else {
    if (user.feeds.length == 0) {
      _feeds = []
    } else {
      _feeds = user.feeds.split(',')
    }
  }

  return {
    userId: '',
    uuid: user.uuid,
    leaders: _leaders,
    followers: _followers,
    posts: _posts,
    feeds: _feeds,
    name: user.name,
    feedCursor: user.feedCursor,
    userDetail: user.userDetail
  }
}