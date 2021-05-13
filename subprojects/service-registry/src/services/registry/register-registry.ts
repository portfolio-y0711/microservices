import { IServiceRegistryContext } from './index'

export const Register
    = (Cleanup: (conext: IServiceRegistryContext) => () => void) => {
        return (context: IServiceRegistryContext) => {
            return (name: string, version: string, ip: string, port: number): string => {
                const { services, log } = context
                const logger = log()
                Cleanup(context)()
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                const key = name + version + ip + port
                if (!services.has(key)) {
                    services.set(key,
                        {
                            timestamp: Math.floor(new Date().getTime() / 1000),
                            ip: ip,
                            port: port,
                            name: name,
                            version: version
                        })
                    logger.debug(`Added services ${name}, version ${version} at ${ip}:${port}`)
                    return key
                }
                services.set(key, {
                    ...services.get(key),
                    timestamp: Math.floor(new Date().getTime() / 1000)
                })
                logger.debug(`Updated services ${name}, version ${version} at ${ip}:${port}`)
                return key
            }
        }
    }