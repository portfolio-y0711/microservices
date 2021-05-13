import { IWriterProps } from './writer'

export const writerPanelView
    // = (user: IUser, users: IUser[]): string => {
    = (props: IWriterProps): string => {
        const { img, name, device, deviceIcon, leaders } = props.logginUser!
        const { users }= props
        const friends = users.filter(u => leaders.includes(u.uuid))

        const postFeed = `writer.postFeed(document.forms['feedform'])`

        return (`
        <div class="panel">
            <div class="panel-body">
                <a class="media-left" href="#">
                    <img class="img-circle img-md" alt="Profile Picture" src="img/${img}.png"/>
                </a>
                <div class="media-body">
                    <div class="mar-btm"><a class="btn-link text-semibold media-heading box-inline" href="#">${name}</a>
                        <p class="text-muted text-sm"><i class="fa ${deviceIcon} fa-lg"></i> - From ${device}</p>
                    </div>
                </div>
                <div class="media-body">
                    <div class="col-lg-12">
                        <span class="image-list m-t-20">
                            ${friends.map(f => `
                                <a href="javascript:void(0)">
                                    <img 
                                        class="img-thumbnail img-circle img-xs" 
                                        src="img/${f.img}.png" 
                                        alt="user" 
                                        width="50" 
                                    />
                                </a>
                            `).join('')}
                        </span>
                    </div>
                </div>
                <hr/>
                <form name="feedform">
                    <textarea class="form-control" name="msg" id="msg" rows="2" placeholder="What are you thinking?"></textarea>
                    <input type="hidden" name="access_token" id="access_token" value="#access_token"/>
                    <div class="mar-top clearfix">
                        <button onclick="${postFeed}" class="btn btn-sm btn-primary pull-right" type="button">
                            <i class="fas fa-pencil-alt fa-fw"></i> 
                            Publish
                        </button>
                        <a class="btn btn-trans btn-icon fas fa-video add-tooltip" href="#"></a>
                        <a class="btn btn-trans btn-icon fas fa-camera add-tooltip" href="#"></a>
                        <a class="btn btn-trans btn-icon fas fa-file add-tooltip" href="#"></a>
                    </div>
                </form>
            </div>
        </div>
        `)
    }