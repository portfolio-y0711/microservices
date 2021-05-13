import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import { uid8digit } from '@micro/utils'


@Entity()
@Unique(['uuid'])
export class UserDetail implements IUserDetail {
    @PrimaryColumn()
    userDetailId: string

    @Column()
    uuid: string

    @Column()
    img: string

    @Column()
    device: string

    @Column()
    deviceIcon: string
}


export interface IUserDetail {
    userDetailId?: string
    uuid?: string
    img: string
    device: string
    deviceIcon: string
}


export const CreateUserDetail
    = (userDetailIdGenerator: () => string) => {
        return (userInput: IUserDetail): UserDetail => {
            if (!('uuid' in userInput)) {
                throw Error('no uuid provided')
            } else {
                return {
                    ...{ uuid: userInput.uuid },
                    ...{ userDetailId: userDetailIdGenerator(), },
                    ...userInput,
                }
            }
        }
    }

export const createUserDetail = CreateUserDetail(uid8digit)

