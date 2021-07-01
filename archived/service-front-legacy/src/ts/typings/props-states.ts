import { IUser } from './entities'
import { IFeederProps, ILoginProps, INavbarProps, ISelectorProps, IWriterProps } from '../components'

export interface IFeedPageModuleState {
    login: ILoginProps,
    navbar: INavbarProps
    selector: ISelectorProps
    feeder: IFeederProps,
    writer: IWriterProps,
}

export interface IFeedState {
    logginUser: IUser
    users: IUser[]
    feeds: []
}