import { Connection, DeleteResult, UpdateResult } from 'typeorm'
import { Feed } from '@feed/database'
import { IDBConnection } from '@feed/database'

export const ReadAll
    = (conn: IDBConnection) => {
        return async (): Promise<Feed[]> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(Feed).find()
        }
    }

export const Read
    = (conn: IDBConnection) => {
        return async (uuid: string): Promise<Feed> => {
            const db: Connection = await conn.getConnection()
            return db.createQueryBuilder()
                .select('feed')
                .from(Feed, 'feed')
                .where('feed.uuid = :uuid', { uuid: uuid })
                .getOne()
        }
    }

export const Create
    = (conn: IDBConnection) => {
        return async (feed: Feed): Promise<Feed> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(Feed).save(feed)
        }
    }


export const Update
    = (conn: IDBConnection) => {
        return async (feed: Feed): Promise<UpdateResult> => {
            const db: Connection = await conn.getConnection()
            return db.createQueryBuilder()
                .update(Feed)
                .set({ ...feed })
                .where('uuid = :uuid', { uuid: feed.uuid })
                .execute()
        }
    }

export const Delete
    = (conn: IDBConnection) => {
        return async (uuid: string): Promise<DeleteResult> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(Feed)
                .createQueryBuilder()
                .delete()
                .from(Feed)
                .where('feed.uuid = :uuid', { uuid: uuid })
                .execute()
        }
    }
