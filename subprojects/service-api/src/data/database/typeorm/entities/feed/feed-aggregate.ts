import {
  Entity,
  PrimaryColumn,
  Column,
  // Tree,
  // TreeChildren,
  // TreeParent,
  Index,
} from 'typeorm'
import { uid4digit, uid8digit } from '@macroserviced/utils'
import { User } from '../user/user-aggregate'

@Entity()
// @Tree('materialized-path')
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

  @Column()
  writerUid: string

  @Column('simple-array')
  likers?: string[] | string

  @Column('simple-array')
  dislikers?: string[] | string

  @Column('simple-array')
  childrenlist?: string[] | string

  @Column({
    nullable: true
  })
  parentUid?: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  children?: Feed[] | undefined
}

export interface IFeed {
  feedId?: string
  uuid?: string
  writerUid: string
  childrenlist?: string[] | string
  children?: Feed[]
  parentUid?: string
  msg: string
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
      ...{ children: [] },
      ...{ childrenlist: [] },
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
