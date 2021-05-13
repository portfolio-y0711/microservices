import { IConfig } from 'config'
import path from 'path'
import { parseJsonFromFile } from '@micro/utils'
import TypeormConnection from '@feed/database/typeorm/connection'
import { createTypeormConnection, User, UserDetail } from '@feed/database'

import { seedUser } from '@settings/_user/seeding.user'
import { seedUserDetail } from '@settings/_user/seeding.user'

import { createPostsUpdate_selected } from '@settings/_user/updating.user'
import { seedFeed_selected, IUserInstanceType } from '@settings/_feed/seeding.feed'

import { updateUserFollow } from '@settings/_user/updating.user'
import { updateUserFeeds } from '@settings/_user/updating.user'
import { updateUserPosts } from '@settings/_user/updating.user'
import { updateFeedDateTime, createFeedDateTimeUpdate_selected } from '@settings/_feed/updating.feed'
// import { updateUserFeeds } from '@tests/settings/feed/updating.user'
// import { updateUserFollow } from '@tests/settings/feed/updating.user'


export default async function conn(config: IConfig): Promise<TypeormConnection> {
    const _conn = createTypeormConnection(undefined, config.database.dev)
    const conn = await _conn.getConnection()

    // await seedUserCredential(conn)
    // await seedUserDetail(conn)
    const { ETHAN, JACKY, JAMES, JENNY, MARK, MIA, MICHAEL, TOM } = IUserInstanceType

    await seedUserDetail(conn)(parseJsonFromFile<UserDetail>(path.join(__dirname, '../cli/seeds/user/detail.json')))

    const logs
        = ([
            '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎    seed user    ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await seedUser(conn)(parseJsonFromFile<User>(path.join(__dirname, '../cli/seeds/user/user.json'))),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎    seed feed    ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await seedFeed_selected(conn)(MICHAEL),
            await seedFeed_selected(conn)(TOM),
            await seedFeed_selected(conn)(JENNY),
            await seedFeed_selected(conn)(JACKY),
            await seedFeed_selected(conn)(JAMES),
            await seedFeed_selected(conn)(MIA),
            await seedFeed_selected(conn)(MARK),
            await seedFeed_selected(conn)(ETHAN),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎   update posts   ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await updateUserPosts(conn)([
                ...createPostsUpdate_selected(MICHAEL),
                ...createPostsUpdate_selected(TOM),
                ...createPostsUpdate_selected(JENNY),
                ...createPostsUpdate_selected(JACKY),
                ...createPostsUpdate_selected(JAMES),
                ...createPostsUpdate_selected(MIA),
                ...createPostsUpdate_selected(MARK),
                ...createPostsUpdate_selected(ETHAN),
            ]),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎   update feed    ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await updateUserFeeds(conn)([
                {
                    "uuid": "4fae",
                    "name": "Michael",
                    "feeds": ["0ce4", "cb77", "8676", "7521", "e2d9", "c73d"],
                    "feedCursor": 0
                }
            ]),
            await updateFeedDateTime(conn)(createFeedDateTimeUpdate_selected(MICHAEL)),
            // await updateFeedDateTime(conn)([
            //     {
            //         "feedId": "e5b93667",
            //         'uuid': "c2d8",
            //         "createdAt": new Date(2016, 11, 17, 0, 0, 0, 0)
            //     }
            // ]),

            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎  update follows  ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await updateUserFollow(conn)([
                {
                    "uuid": MICHAEL,
                    "name": "Michael",
                    "leaders": [JENNY, TOM],
                    "followers": [TOM]
                },
                {
                    "uuid": JENNY,
                    "name": "Jenny",
                    "leaders": [JACKY, MIA],
                    "followers": [MICHAEL, JACKY]
                },
                {
                    "uuid": TOM,
                    "name": "Tom",
                    "leaders": [MICHAEL],
                    "followers": [MICHAEL]
                },
                {
                    "uuid": JACKY,
                    "name": "Jacky",
                    "leaders": [JENNY],
                    "followers": [JENNY]
                },
                {
                    "uuid": MIA,
                    "name": "Mia",
                    "leaders": [],
                    "followers": [JENNY]
                },
            ])
        ].join('\n\n'))
    console.log(logs)

    return _conn
}