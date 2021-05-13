import { Feed } from '@feed/database'
import { randomDateBeforeDate } from '@feed/database/typeorm/entities/feed/feed-aggregate'
import { parseJsonFromFile } from '@micro/utils'
import { stringifyJsonToFile } from '@micro/utils'



void (async () => {
    const feeds = parseJsonFromFile<Feed>('./james-feed.json')
    const _feeds = feeds
        .map(f => (f.createdAt === undefined)
            ? Object.assign(f, { createdAt: randomDateBeforeDate(new Date(), 2) }) 
            : f)
        .sort((a: Feed, b: Feed) => (Date.parse(a.createdAt as unknown as string) - Date.parse(b.createdAt as unknown as string)))
    stringifyJsonToFile<Feed>('./james-feed.json')(_feeds)

})()
