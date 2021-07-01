import {
  Entity,
  PrimaryColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  ManyToOne,
  Index,
} from 'typeorm'
import { uid4digit, uid8digit } from '@macroserviced/utils'
import { User } from '../user/user-aggregate'

@Entity()
@Tree('materialized-path')
export class Feed implements IFeed {
  @PrimaryColumn({ type: 'varchar', length: 8 })
  feedId: string

  @Column({
    length: 4,
    unique: true,
  })
  @Index()
  uuid: string

  @Column()
  msg: string

  @ManyToOne(() => User)
  writer: User

  // @Column('text', { array: true })
  // likers?: string[]

  @Column('text', { array: true })
  likers?: string[] | string

  // @Column('text', { array: true })
  // dislikers?: string[]

  @Column('text', { array: true })
  dislikers?: string[] | string

  @TreeChildren()
  replies?: Feed[]

  @TreeParent()
  parent?: Feed

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date
}

export interface IFeed {
  feedId?: string
  uuid?: string
  writer: User
  msg: string
  replies?: Feed[]
  parent?: Feed
  likers?: User['uuid'][] | User['uuid']
  dislikers?: User['uuid'][] | User['uuid']
  createdAt?: Date
}

export const CreateFeed =
  (
    feedIdGenerator: () => string,
    uuidGenerator: () => string,
    dateTimeGenerator?: () => Date,
  ) =>
  (userInput: IFeed): Feed => {
    return {
      ...{
        createdAt:
          dateTimeGenerator === undefined
            ? new Date(Date.now())
            : dateTimeGenerator(),
      },
      ...{ feedId: feedIdGenerator() },
      ...{ uuid: uuidGenerator() },
      ...{ dislikers: [] },
      ...{ likers: [] },
      ...userInput,
    }
  }

export const createFeed = CreateFeed(
  uid8digit,
  uid4digit,
  () => new Date(Date.now()),
)

export const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

export const randomDateBeforeDate = (start: Date, days: number): Date => {
  return new Date(start.getTime() - Math.random() * days * 24 * 60 * 60 * 1000)
}
