import { IHandler, IModule, IUser } from '../../typings'
import { loginModalView } from './login-views'

export interface ILoginProps {
    logginUser?: IUser
    users: IUser[]
}

export class Login implements IModule {
    props: ILoginProps
    handler: IHandler

    constructor(props: ILoginProps) {
        this.props = props
    }

    render(): string {
        const isLoggined = this.props.logginUser && ('name' in this.props.logginUser)
        return (`
            <div>
                ${!isLoggined ? loginModalView(this.props) : ''}
            <div/>
            `)
    }
}

