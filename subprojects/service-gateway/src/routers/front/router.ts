import { Router } from 'express'
import { IFrontController } from '@gateway/controllers/front'
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
            .get('/css/:filename', controller.getCss)
            .get('/js/:filename', controller.getJs)
            .get('/webfonts/:filename', controller.getWebfonts)
        return router
    }