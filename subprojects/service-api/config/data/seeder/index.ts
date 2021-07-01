import { IUserDetail } from '@feed/data/database'
import { IUser } from '@feed/data/database'
import { User } from '@feed/data/database'
import { IFeed } from '@feed/data/database/typeorm/entities'

import { Connection } from 'typeorm'
import { SeedUserDetail } from './impl/seed-user-detail'
import { SeedUser } from './impl/seed-user'
import { SeedFeed } from './impl/seed-posts'
import { UpdateUserFollows } from './impl/update-user-follows'
import { UpdateUserPosts } from './impl/update-user-posts'
import { UpdateUserFeeds } from './impl/update-user-feeds'
import { EUserUid } from '@config/data/typings'

export interface ISeeder {
	seedUserDetail: (userDetailSeeds: Partial<IUserDetail>[]) => Promise<string>
	seedUser: (userSeeds: Partial<IUser>[]) => Promise<string>
	seedFeed: (feedSeeds: Partial<IFeed>[]) => Promise<string>
	updateUserFollows: (userFollowUpdates: Partial<User>[]) => Promise<string>
	updateUserFeeds: (userTable: Map<EUserUid, string>) => (userSelection: (EUserUid| EUserUid[])) => Promise<string>
	updateUserPosts: (userTable: Map<EUserUid, string>) => (userSelection: (EUserUid| EUserUid[])) => Promise<string>
}

const Seeder = (conn: Connection): ISeeder => {
	const seedUserDetail = SeedUserDetail(conn)
	const seedUser = SeedUser(conn)
	const seedFeed = SeedFeed(conn)
	const updateUserFollows = UpdateUserFollows(conn)
	const updateUserPosts = UpdateUserPosts(conn)
	const updateUserFeeds = UpdateUserFeeds(conn)

	return {
		seedUserDetail,
		seedUser,
		seedFeed,
		updateUserFollows,
		updateUserFeeds,
		updateUserPosts,
	}
}

export default Seeder