import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import { uid8digit } from '@macroserviced/utils'

@Entity()
@Unique(['uuid'])
export class UserProfile implements IUserProfile {
  @PrimaryColumn()
  userProfileId: string

  @Column()
  uuid: string

  @Column()
  username: string

  @Column()
  location?: string

  @Column()
  age?: string

  @Column('date')
  joined: Date

  @Column()
  website?: string

  @Column('text')
  introduction?: string
}

export interface IUserProfile {
  userProfileId?: string
  uuid?: string
  username: string
  location?: string
  age?: string
  joined: Date
  website?: string
  introduction?: string
}

export const CreateUserProfile = (userProfileIdGenerator: () => string) => {
  return (userInput: IUserProfile): UserProfile => {
    if (!('uuid' in userInput)) {
      throw Error('no uuid provided')
    } else {
      return {
        ...{ uuid: userInput.uuid },
        ...{ userProfileId: userProfileIdGenerator() },
        ...userInput,
      }
    }
  }
}

export const createUserProfile = CreateUserProfile(uid8digit)
