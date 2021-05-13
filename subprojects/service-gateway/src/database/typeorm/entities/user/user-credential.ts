import { Column, Entity, PrimaryColumn } from 'typeorm'
import { uid8digit } from '@micro/utils'


@Entity()
export class UserCredential implements IUserCredential {
    @PrimaryColumn()
    userCredentialId: string

    @Column()
    uuid: string

    @Column()
    password: string
}


export interface IUserCredential {
    userCredentialId?: string
    uuid?: string
    password: string
}


export const CreateUserCredential
    = (userCredentialIdGenerator: () => string) => {
        return (userInput: IUserCredential): UserCredential => {
            if (!('uuid' in userInput)) {
                throw Error('no uuid provided')
            } else {
                return {
                    ...{ uuid: userInput.uuid },
                    ...{ userCredentialId: userCredentialIdGenerator(), },
                    ...userInput,
                }
            }
        }
    }

export const createUserCredential = CreateUserCredential(uid8digit)
