import { NextFunction, Request, Response } from 'express'
import { GetHome } from './controllers'
import { GetCss } from './controllers'
import { GetJs } from './controllers'
import { GetImg } from './controllers'
import { GetWebfonts } from './controllers'
import { GetBaseurl } from './controllers'
import { ICircuitBreaker } from '@gateway/services'
import { IServiceFinder } from '@gateway/services'

export interface IFrontController {
    getHome: (req: Request, res: Response, next: NextFunction) => void
    getCss: (req: Request, res: Response, next: NextFunction) => void
    getJs: (req: Request, res: Response, next: NextFunction) => void
    getImg: (req: Request, res: Response, next: NextFunction) => void
    getBaseurl: (req: Request, res: Response, next: NextFunction) => void
    getWebfonts: (req: Request, res: Response, next: NextFunction) => void
}


export const FrontController
    = ({ circuitBreaker, serviceFinder }: { circuitBreaker: ICircuitBreaker, serviceFinder: IServiceFinder }): IFrontController => {
        const getHome = GetHome({ circuitBreaker, serviceFinder })
        const getCss = GetCss({ circuitBreaker, serviceFinder })
        const getJs = GetJs({ circuitBreaker, serviceFinder })
        const getImg = GetImg({ circuitBreaker, serviceFinder })
        const getWebfonts = GetWebfonts({ circuitBreaker, serviceFinder })
        const getBaseurl = GetBaseurl({ circuitBreaker, serviceFinder })
        return {
            getHome,
            getCss,
            getJs,
            getImg,
            getWebfonts,
            getBaseurl,
        }
    }
