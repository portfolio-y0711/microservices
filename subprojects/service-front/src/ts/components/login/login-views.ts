import { IUser } from '../../typings'

export const loginModalView
    = (props: { users: IUser[] }): string => {

        const { users } = props
        const selectionEventHandler = (selector: string) => `login.select${selector}UserToLogin()`
        const userSelectionView = (props: IUser, index: number): string => {
            const loginEventHandler = `login.processLogin(document.forms['loginform${index}'])`
            return (`
        <div data-user-index='${index}' style="display:none;">
            <img class="profile-img" src="img/${props.img}.png"
                alt="">
            <p class="profile-name">${props.name}</p>
            <span class="profile-email">${props.name.toLowerCase()}@gmail.com</span>
            <form name="loginform${index}" class="form-signin">
                <input type="hidden" name="id" value="${props.uuid}">
                <input type="password" name="pass" value="${props.name}" class="form-control" placeholder="Password" required autofocus readonly>
                <button onclick="${loginEventHandler}" class="btn btn-lg btn-primary btn-block" type="button">
                    Sign in
                </button>
                <a href="#" class="need-help">Need help? </a><span class="clearfix"></span>
            </form>
            <a href="#" class="text-center new-account">Sign in with a different account</a>
        </div>
    `)
        }
        return (`
        <button class="btn btn-primary hidden" type="button" data-toggle="modal" data-target="#login">HiddenButton</button>
        <div class="modal modal-center fade" id="login" tabindex="-1" role="dialog" aria-labelledby="my80sizeCenterModalLabel">
            <div class="modal-dialog modal-80size modal-center" role="document">
                <div class="modal-content modal-80size">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"></h4>
                    </div>

                    <div id="modal-body" class="modal-body">
                        <div onclick="${selectionEventHandler('Prev')}" class="left carousel-control">
                            <i class="fa fa-chevron-left"></i>
                        </div>
                        <div onclick="${selectionEventHandler('Next')}" class="right carousel-control">
                            <i class="fa fa-chevron-right"></i>
                        </div>
                            ${users.map((user: IUser, index: number) => userSelectionView(user, index)).join('')}
                        </div>

                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">
                            close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `)
    }

export const logoutNavView
    = (props: IUser): string => {

        const logoutEventHandler = `login.processLogout()`
        return (`
        <li 
            class="dropdown" 
            onmouseenter="this.classList.add('active')" 
            onmouseout="this.classList.remove('active')">
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
                                    <img class="icon-size" width="80" height="80" alt="120x120" src="img/${props.img}.png"/>
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
                                <p><a class="btn btn-danger btn-block" href="#" onclick="${logoutEventHandler}">Logout</a></p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </li>
    `)
    }