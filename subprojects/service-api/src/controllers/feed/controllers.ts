export { GetFeeds } from './get-feeds-controller'
export { PostFeed } from './post-feed-controller'

/*
    export const PutLikeComment = (service: IFeedService) => async(httpRequest: Request) => {
        const { commentUid } = httpRequest.params
        const { useruid } = httpRequest
        const result = await service.likeComment({ commentUid, userUid: useruid })
        const httpResponse: Partial<Response> = {}
        return httpResponse
    }

    export const PutDislikeComment = (service: IFeedService) => async(httpRequest: Request) => {
        const { commentUid } = httpRequest.params
        const { useruid } = httpRequest
        const result = await service.dislikeComment({ commentUid, userUid: useruid })
        const httpResponse: Partial<Response> = {}
        return httpResponse
    }

    export const PutAddComment = (service: IFeedService) => async(httpRequest: Request) => {
        const { feedUid } = httpRequest.params
        const { userInput: { feedComment } } = httpRequest.body
        const { useruid } = httpRequest
        const result = await service.addComment({ feedUid, writerUid: useruid, feedComment })
        const httpResponse: Partial<Response> = {}
        return httpResponse
    }
*/