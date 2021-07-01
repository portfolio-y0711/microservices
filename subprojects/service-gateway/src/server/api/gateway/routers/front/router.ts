import { Router } from 'express'
import { IFrontController } from '@gateway/server/api/gateway/controllers'
import { Cors } from '@gateway/middlewares'
// import express from 'express'
// import NextFunction from 'express'

export const FrontRouter
    = (controller: IFrontController): Router => {

        const router = Router()
        router
            .get('/', controller.getHome)
            .get('/baseurl', Cors, controller.getBaseurl)
            .get('/img/:filename', controller.getImg)
            .get('/static/css/:filename', controller.getCss)
            .get('/static/js/:filename', controller.getJs)
            .get('/static/webfonts/:filename', controller.getWebfonts)
        return router
    }