import { IHandler, IModule, IUser } from '../../typings'
import { selectorNavView, loginNavView, logoutNavView, writerNavView, feederNavView } from './navbar-views'

export interface INavbarProps {
    logginUser?: IUser
    users: IUser[]
}

export class Navbar implements IModule {
    props: INavbarProps
    handler: IHandler
    constructor(props: INavbarProps) {
        this.props = props
    }
    render(): string {
        const isLoggined = this.props.logginUser && ('name' in this.props.logginUser)
        return (`
                <div class="navbar navbar-default navbar-static-top">
                    <div class="container bootstrap snippets bootdey">
                        <div class="navbar-header">
                            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                                ${[...Array(3).keys()].map(_ => '<span class="icon-bar"></span>').join('')}
                            </button>
                            <a class="navbar-brand" href="#"><strong>Feed</strong></a>
                        </div>
                        <div class="collapse navbar-collapse">
                            <ul class="nav navbar-nav navbar-right">
                            ${isLoggined! ? [feederNavView() ,writerNavView(), selectorNavView(),].join('') : ''}
                            ${!isLoggined! ? loginNavView() : logoutNavView(this.props.logginUser!)}
                            </ul>
                        </div>
                    </div>
                </div>
            `)
    }
}

