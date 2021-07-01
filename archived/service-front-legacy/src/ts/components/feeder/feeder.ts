import { IFeed, IHandler, IModule, IUser } from "../../typings"

export interface IFeederProps {
    logginUser?: IUser
    users: IUser[]
    feeds: IFeed[]
}

export class Feeder implements IModule {
    props: IFeederProps
    handler: IHandler

    constructor(props: IFeederProps) {
        this.props = props
    }

    render(): string {
        const { feeds, users } = this.props
        if (feeds.length > 0) {
            return (`
                <div class="panel">
                    <div class="panel-body feedlist">
                        ${feeds.map(feed => {
                            const user = users.find(u => u.uuid === feed.writer.uuid)!
                            return (`
                                <div class="media-block">
                                    <a class="media-left" href="#">
                                        <img 
                                            class="img-circle img-sm" 
                                            alt="Profile Picture" 
                                            src="img/${user.img}.png"/>
                                    </a>
                                    <div class="media-body">
                                        <div class="mar-btm">
                                            <a class="btn-link text-semibold media-heading box-inline" href="#">${user.name}</a>
                                            <p class="text-muted text-sm"
                                                <i class="fa fa-mobile-alt fa-lg">
                                                </i> - From Mobile - 7 min ago
                                            </p>
                                            <p>${feed.msg}</p>
                                            <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
                                            <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
                                            </div>
                                        </div>
                                    <hr/>
                                </div>`
                            )}).join('')}


                    </div>
                </div>
            `)
        } else {
            return (`
                <div class="panel">
                    <img class="fit-picture"
                    src="img/no-posts.png"
                </div>
            `)
        }
    }
    // ${feedTreeView(comments, logginUser)} 
}

// const tmp = `<div class="panel">
//                     <div class="panel-body feedlist">
//                         <div class="media-block">
//                             <a class="media-left" href="#">
//                                 <img 
//                                     class="img-circle img-sm" 
//                                     alt="Profile Picture" 
//                                     src="https://bootdey.com/img/Content/avatar/avatar3.png"/>
//                             </a>
//                             <div class="media-body">
//                                 <div class="mar-btm">
//                                     <a class="btn-link text-semibold media-heading box-inline" href="#">Jenny</a>
//                                     <p class="text-muted text-sm">
//                                         <i class="fa fa-mobile-alt fa-lg">
//                                         </i> - From Mobile - 7 min ago
//                                     </p>
//                                     <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
//                                     <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
//                                       <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
//                                     </div>
//                                 </div>
//                             <hr/>
//                         </div>

//                         <div class="media-block">
//                             <a class="media-left" href="#">
//                                 <img 
//                                     class="img-circle img-sm" 
//                                     alt="Profile Picture" 
//                                     src="https://bootdey.com/img/Content/avatar/avatar4.png"/>
//                             </a>
//                             <div class="media-body">
//                                 <div class="mar-btm">
//                                     <a class="btn-link text-semibold media-heading box-inline" href="#">Tom</a>
//                                     <p class="text-muted text-sm">
//                                         <i class="fa fa-mobile-alt fa-lg">
//                                         </i> - From Mobile - 7 min ago
//                                     </p>
//                                     <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
//                                     <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
//                                       <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
//                                     </div>
//                                 </div>
//                             <hr/>
//                             <--  -->

//                             <div class="media-block">
//                                 <a class="media-left" href="#">
//                                     <img 
//                                         class="img-circle img-sm" 
//                                         alt="Profile Picture" 
//                                         src="https://bootdey.com/img/Content/avatar/avatar5.png"/>
//                                 </a>
//                                 <div class="media-body">
//                                     <div class="mar-btm">
//                                         <a class="btn-link text-semibold media-heading box-inline" href="#">Jacky</a>
//                                         <p class="text-muted text-sm">
//                                             <i class="fa fa-mobile-alt fa-lg">
//                                             </i> - From Mobile - 7 min ago
//                                         </p>
//                                         <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
//                                         <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
//                                         <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
//                                         </div>
//                                     </div>
//                                 <hr/>
//                                 <--  -->
//                                 <div class="panel">
//                                     <div class="panel-body">
//                                         <a class="media-left" href="#">
//                                             <img 
//                                                 class="img-circle img-sm" 
//                                                 alt="Profile Picture" 
//                                                 src="https://bootdey.com/img/Content/avatar/avatar2.png"/>
//                                         </a>
//                                         <div class="media-body">
//                                             <div class="mar-btm"><a class="btn-link text-semibold media-heading box-inline" href="#">Michael</a>
//                                                 <p class="text-muted text-sm"><i class="fa fa-mobile-alt fa-lg"></i> - From Web</p>
//                                             </div>
//                                         </div>
//                                         <hr/>
//                                         <form name="feedform">
//                                             <textarea class="form-control" name="msg" id="msg" rows="2" placeholder="What are you thinking?"></textarea>
//                                             <input type="hidden" name="access_token" id="access_token" value="#access_token"/>
//                                             <div class="mar-top clearfix">
//                                                 <button onclick="" class="btn btn-sm btn-primary pull-right" type="button">
//                                                     <i class="fas fa-pencil-alt fa-fw"></i> 
//                                                     Comment
//                                                 </button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                                 <--  -->
//                             </div>
//                         </div>
//                     </div>
//                 </div>`

