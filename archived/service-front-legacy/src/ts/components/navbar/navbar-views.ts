import { IUser } from '../../typings'

export const feederNavView
    = (): string => {

        const eventHandler = `feedpage.navToPage('FEEDS')`
        return (`
        <li 
            id="feed"
            onclick="${eventHandler}" 
            onmouseenter="this.classList.add('active')" 
            onmouseout="this.classList.remove('active')"
        >
            <a href="#">
                <i class="fas fa-rss-square">&nbsp;&nbsp;</i>
                feed
            </a>
        </li>
    `)
    }

export const writerNavView
    = (): string => {
        const eventHandler = `feedpage.navToPage('POST')`
        return (`
        <li 
            id="postNav"
            onclick="${eventHandler}" 
            onmouseenter="this.classList.add('active')" 
            onmouseout="this.classList.remove('active')"
        >
            <a href="#">
                <i class="fas fa-pencil-alt">&nbsp;&nbsp;</i>
                post
            </a>
        </li>
    `)
    }

export const selectorNavView
    = (): string => {

        const eventHandler = `feedpage.navToPage('FRIEND')`
        return (`
        <li 
            id="friendNav"
            onclick="${eventHandler}" 
            onmouseenter="this.classList.add('active')" 
            onmouseout="this.classList.remove('active')"
        >
            <a href="#">
                <i class="fas fa-users">&nbsp;&nbsp;</i>
                friends
            </a>
        </li>
    `)
    }

export const loginNavView
    = (): string => {

        const eventHandler = 'login.showLoginModal()'
        return (`
        <li 
            id="loginNav"
            onclick="${eventHandler}" 
            onmouseenter="this.classList.add('active')" 
            onmouseout="this.classList.remove('active')"
        >
            <a href="#">
                <i class="fas fa-user-slash">&nbsp;&nbsp;</i>
                login
            </a>
        </li>
    `)
    }

export const logoutNavView
    = (props: IUser): string => {

        const logoutEventHandler = `login.processLogout()`
        return (`
        <li 
            id="logoutNav"
            class="dropdown" 
            onmouseenter="this.classList.add('active')" 
            onmouseout="this.classList.remove('active')"
        >
            <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                <i class="fas fa-user">&nbsp;&nbsp;</i>
                logout (${props.name})
            </a>

            <ul class="dropdown-menu">
                <li>
                    <div class="navbar-login">
                        <div class="row">
                            <div class="col-lg-4">
                                <p class="text-center">
                                    <img class="icon-size" width="80" height="80" alt="120x120" src="https://bootdey.com/img/Content/avatar/${props.img}.png"/>
                                </p>
                            </div>
                            <div class="col-lg-8">
                                <p class="text-left"><strong>${props.name}</strong></p>
                                <p class="text-left small">${props.name.toLowerCase()}@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="divider"></li>
                <li>
                    <div class="navbar-login navbar-login-session">
                        <div class="row">
                            <div class="col-lg-12">
                                <p>
                                    <a 
                                        id="logout"
                                        class="btn btn-danger btn-block" 
                                        href="#" 
                                        onclick="${logoutEventHandler}">
                                    Logout</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </li>
    `)
    }
    // "dev": "nodemon -e ts -x 'yarn stop && sleep 3 && npx gulp --gulpfile ./gulpfile.configs.js && SERVER_PORT=3333 ts-node ./bin/www.ts | bunyan -o short'",