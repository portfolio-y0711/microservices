import { IFeed } from '../../typings'

export const commentView
    = (feeds: IFeed[], logginUser: any) => {
        return (`
        <div class="media-block">
            <a class="media-left" href="#">
            <div class="media-body">
                <div class="mar-btm">
                </div>
                <hr/>
            </div>
        </div>
    `)
    }

export const feedTreeView
    = (objects: Array<any>, logginUser: any) => {
        // let curr = ''
        // for (const obj of objects) {
        //     if (!obj.hasOwnProperty('replies')) {
        //         curr += commentView(obj, logginUser)
        //     }
        //     else {
        //         curr += (`
        //             <div class="comment-wrapper">
        //                 <div class="media-block">
        //                     <a class="media-left" href="#">
        //                         <img class="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/${(obj as any).comment.img}.png"/></a>
        //                     <div class="media-body">
        //                         <div class="mar-btm">
        //                             <a class="btn-link text-semibold media-heading box-inline" href="#">${(obj as any).comment.name}</a>
        //                             <p class="text-muted text-sm"><i class="fa fa-mobile-alt fa-lg"></i> - From ${(obj as any).comment.device} - 7 min ago</p>
        //                         </div>

        //                     </div>
        //                 </div>
        //             </div>
        //         `)
        //     }
        // }
        // return curr
    }
