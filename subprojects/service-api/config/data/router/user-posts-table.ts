import { EUserUid } from "@config/data/typings"

const { JAMES, MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userPostsTable: Map<EUserUid, string> = new Map([
	[JAMES, '../../../cli/seeds/feed/james-feed.json'],
	[MICHAEL, '../../../cli/seeds/feed/michael-feed.json',],
	[JENNY, '../../../cli/seeds/feed/jenny-feed.json'],
	[TOM, '../../../cli/seeds/feed/tom-feed.json'],
	[JACKY, '../../../cli/seeds/feed/jacky-feed.json'],
	[MARK, '../../../cli/seeds/feed/mark-feed.json'],
	[ETHAN, '../../../cli/seeds/feed/ethan-feed.json'],
	[MIA, '../../../cli/seeds/feed/mia-feed.json'],
])
