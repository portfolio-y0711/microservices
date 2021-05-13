import express from 'express'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/services/circuit'
import { IServiceFinder } from '@gateway/services/finder'
import { Readable } from 'stream'

export const GetWebfonts
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (req: express.Request, res: express.Response): Promise<void> => {
            const { filename } = req.params
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-front', '1.0.0')
            const result = await circuitBreaker.invokeService({
                baseURL,
                url: '/webfonts/' + filename,
                method: 'GET',
                responseType: 'stream'
            })
            const readable: Readable = result
            res.setHeader('content-type', 'font/opentype');
            // svg   as "image/svg+xml"                  (W3C: August 2011)
            // ttf   as "application/x-font-ttf"         (IANA: March 2013)
            //       or "application/x-font-truetype"
            // otf   as "application/x-font-opentype"    (IANA: March 2013)
            // woff  as "application/font-woff"          (IANA: January 2013)
            // woff2 as "application/font-woff2"         (W3C W./E.Draft: May 2014/March 2016)
            // eot   as "application/vnd.ms-fontobject"  (IANA: December 2005)
            // sfnt  as "application/font-sfnt"          (IANA: March 2013) 
            readable.pipe(res)
            return
        }
    }
