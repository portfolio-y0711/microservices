import { Column, Connection, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { uid4digit, uid8digit } from '@micro/utils'
import { Feed } from '../feed'
import { UserDetail } from './index'

@Entity()
export class User {
    @PrimaryColumn({ type: 'varchar', length: 8 })
    userId: string

    @Column({ type: 'varchar', length: 4, unique: true })
    uuid: string

    @Column()
    name: string

    @OneToOne(() => UserDetail)
    @JoinColumn()
    userDetail?: UserDetail

    @Column()
    feedCursor: number

    @Column('simple-array')
    posts: string[]

    @Column('simple-array')
    feeds: string[]

    @Column('simple-array')
    leaders: string[]

    @Column('simple-array')
    followers: string[]
}

export interface IUser {
    userId: string
    uuid: string
    name: string
    userDetail?: UserDetail
    posts?: Feed['uuid'][]
    feeds?: Feed['uuid'][]
    feedCursor?: number
    leaders?: User['uuid'][]
    followers?: User['uuid'][]
}

export const CreateUser
    = () => {
        return (userInput: IUser): User => {
            const _uuid = uid4digit()
            return { 
                userId: uid8digit(), 
                uuid: _uuid, 
                ...{ feedCursor: 0 }, 
                ...{ posts: [] }, 
                ...{ leaders: [] }, 
                ...{ followers: [] }, 
                ...{ feeds: [] }, 
                ...userInput 
            }
        }
    }

export const createUser
    = (userInput: IUser): User => {
        return {
            ...{ feedCursor: 0 },
            ...{ posts: [] },
            ...{ leaders: [] },
            ...{ followers: [] },
            ...{ feeds: [] },
            ...userInput
        }
    }
