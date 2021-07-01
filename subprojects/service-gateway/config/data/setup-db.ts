import { IConfig } from 'config'
import path from 'path'
import { parseJsonFromFile } from '@macroserviced/utils'
import TypeormConnection from '@gateway/data/database/typeorm/connection'
import { createTypeormConnection, UserCredential } from '@gateway/data/database'
import { seedUserCredential } from '@settings/_user/seeding.user'
import { seedUser } from '@settings/_user'
import { User } from '@gateway/data/database/typeorm/entities/user'

export default async function conn(config: IConfig): Promise<TypeormConnection> {
    const _conn = createTypeormConnection(undefined, config.database.dev)
    const conn = await _conn.getConnection()


    const logs
        = ([
            '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎    seed pass    ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await seedUserCredential(conn)(parseJsonFromFile<UserCredential>(path.join(__dirname, '../../cli/seeds/user/credential.json'))),
            '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎    seed user    ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            await seedUser(conn)(parseJsonFromFile<User>(path.join(__dirname, '../../cli/seeds/user/user.json'))),
        ].join('\n\n'))
    console.log(logs)

    return _conn
    
}