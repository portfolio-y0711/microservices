
export interface IUser {
    name: string
    device: string
    deviceIcon: string
    uuid: string
    img: string
    leaders: string[]
    followers: string[]
    feeds: IFeed['uuid'][]
}

export interface IFeed { 
    uuid: string
    msg: string
    writer: { uuid: IUser['uuid'] }
    likers: IUser['uuid'][]
    dislikers: IUser['uuid'][]
    // replies: IFeed[]
}
