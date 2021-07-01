import axios from 'axios'
import url from 'url'
import { IApplicationConfig } from '@gateway/typings'

export interface IServiceFinder {
    getServiceUrl: (servicename: string, serviceversion: string) => Promise<string>
}

export const ServiceFinder
    = (config: IApplicationConfig): IServiceFinder => {
        const { services: { production } } = config

        const getServiceUrl
            = async (servicename: string, serviceversion: string) => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                const { data } = await axios.get(`${production.serviceRegistryUrl}/api/registries`, {
                    params: {
                        servicename,
                        serviceversion
                    }
                })
                const { service: { ip, port } } = data
              const _ip = ip.replace(/^.*:/, '').match( /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)[0]
                const domain = process.env.DOMAIN
                const service_url = new url.URL(`${ip === '[::ffff:127.0.0.1]' ? (domain ? domain: 'http://localhost'): (`http://${_ip}`)}`)
                service_url.port = port
                return service_url.href 
            }
        return {
            getServiceUrl
        }
    }

export const MockServiceFinder
    = (config: IApplicationConfig): IServiceFinder => {
        const getServiceUrl
            = async (servicename: string) => {
                switch (servicename) {
                    case 'service-feed':
                        return (await new Promise(res => setTimeout(res, 0, 'http://localhost:4010')) as Promise<unknown>) as Promise<string>
                    case 'service-user':
                        return (await new Promise(res => setTimeout(res, 0, 'http://localhost:4010')) as Promise<unknown>) as Promise<string>
                }
            }
        return {
            getServiceUrl
        }
    }
