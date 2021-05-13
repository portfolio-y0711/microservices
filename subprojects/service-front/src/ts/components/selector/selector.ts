import { IHandler, IModule, IUser } from '../../typings'
import { selectorPanelView } from './selector-views'

export interface ISelectorProps {
    logginUser?: IUser
    users: IUser[]
}

export class Selector implements IModule {
    props: ISelectorProps
    handler: IHandler

    constructor(props: ISelectorProps) {
        this.props = props
    }

    render(): string {
        const isUserListLoaded = (this.props.users !== undefined)
        const isLoggined = (this.props.logginUser !== undefined)

        if (isUserListLoaded && isLoggined) {
            return (`
                ${selectorPanelView(this.props)}
                <Profile></Profile>
            `)
        } else {
           return ('')
        }
    }
}