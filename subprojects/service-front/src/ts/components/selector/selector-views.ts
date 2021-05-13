import { IUser } from '../../typings'
import { ISelectorProps } from './selector';

export const selectorPanelView
    = (props: ISelectorProps): string => {
        const { logginUser, users } = props
        return (
        `<div id="selector-panel" class="panel">
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12">
                        <div>
                            <ul class="ace-thumbnails clearfix">
                            ${users
                                .filter((user: IUser) => (user.uuid !== logginUser!.uuid))
                                .map((user: IUser) => (thumbnailView(logginUser!, user))).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        )
    }

export const thumbnailView
    = (logginUser: IUser, user: IUser): string => {

        const showProfileEventHandler = `selector.showUserProfile({ uuid: '${user.uuid}', name: '${user.name}', img: '${user.img}'})`
        const isFollowed = logginUser.leaders.includes(user.uuid)
        return (`
        <li 
            onclick="${showProfileEventHandler}" 
            data-toggle="tooltip" title="" href="" data-original-title="${user.name}" 
            id="${user.uuid}" class="${isFollowed ? 'followed' : ''}">
            <a class="cboxElement" href="#" data-rel="colorbox">
                <img width="80" height="80" alt="80x80" src="img/${user.img}.png"/>
                <div class="text">
                    <div class="inner"></div>
                </div>
                <div class="tags">
                    <span class="label-holder">
                        ${isFollowed ? '<span class="label label-primary">follow</span>' : ''}
                    </span>
                </div>
            </a>
        </li>
    `)
    }

export const userProfileModalView
    = (logginUser: IUser, user: IUser): string => {

        const { uuid, img, name } = user
        const isFollowed = logginUser.leaders.includes(user.uuid)
        const clickEventHandler = `console.log('${uuid}');selector.${isFollowed ? 'un' : ''}followUser('${uuid}')`
        const onMouseEnterHandler = `${!isFollowed ? "this.classList.remove('btn-light');this.classList.add('btn-primary')" : ""}`
        const onMouseLeaveHandler = `${!isFollowed ? "this.classList.remove('btn-primary');this.classList.add('btn-light')" : "this.classList.remove('btn-light');this.classList.add('btn-primary')"}`
        return (`
        <button type="button" class="btn btn-primary hidden" data-toggle="modal" data-target="#profileModal">
            open modal
        </button>
        <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="profile-page">
                                <div class="card profile-header">
                                    <div class="col-lg-4 col-md-4 col-6">
                                        <div class="profile-image float-md-right">
                                            <img src="img/${img}.png" alt>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-8 col-6">
                                        <h4 class="m-t-0 m-b-0"><strong>${name}</strong></h4>
                                        <span class="job_post">Ui UX Designer</span>
                                        <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                    <div>
                                        <button 
                                            onmouseenter="${onMouseEnterHandler};${isFollowed ? "(this.innerText = 'Unfollow')" : ''}" 
                                            onmouseleave="${onMouseLeaveHandler};${isFollowed ? "(this.innerText = 'Follow')" : ''}" 
                                            class="btn ${isFollowed ? 'btn-primary' : 'btn-light'} 'btn-round'" id="follow" 
                                            onclick=${clickEventHandler}>
                                        Follow
                                        </button>
                                        <button 
                                            onmouseenter="this.classList.remove('btn-light');this.classList.add('btn-primary')" 
                                            onmouseleave="this.classList.remove('btn-primary');this.classList.add('btn-light')" 
                                            class="btn btn-light btn-round">
                                        Message
                                        </button>
                                    </div>
                                    <p class="social-icon m-t-5 m-b-0">
                                        <a title="Twitter" href="javascript:void(0);"><i class="fab fa-twitter"></i></a>
                                        <a title="Facebook" href="javascript:void(0);"><i class="fab fa-facebook"></i></a>
                                        <a title="Google-plus" href="javascript:void(0);"><i class="fab fa-google-plus"></i></a>
                                        <a title="Behance" href="javascript:void(0);"><i class="fab fa-behance"></i></a>
                                        <a title="Instagram" href="javascript:void(0);"><i class="fab fa-instagram"></i></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `)
    }
