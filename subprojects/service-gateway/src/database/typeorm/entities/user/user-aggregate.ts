import { Column, Connection, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { uid4digit, uid8digit } from '@micro/utils'
import { UserCredential } from './user-credential'

@Entity()
export class User {
    @PrimaryColumn({ type: 'varchar', length: 8 })
    userId: string

    @Column({ type: 'varchar', length: 4, unique: true })
    uuid: string

    @Column()
    name: string

    @OneToOne(() => UserCredential)
    @JoinColumn()
    credential: UserCredential
}

export interface IUser {
    userId: string
    uuid: string
    name: string
    credential: UserCredential
}

export const CreateUser
    = (conn: Connection) => {
        return async (userInput: IUser): Promise<User> => {
            const _uuid = uid4digit()
            const userCredential = await conn.getRepository(UserCredential).find({
                where: {
                    uuid: userInput.uuid
                }
            })
            return { 
                userId: uid8digit(), 
                uuid: _uuid, 
                ...{ userCredential: userCredential }, 
                ...userInput 
            }
        }
    }

export const createUser
    = (userInput: IUser): User => {
        return {
            ...userInput
        }
    }
