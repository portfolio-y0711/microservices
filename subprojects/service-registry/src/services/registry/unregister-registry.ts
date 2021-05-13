import { IServiceRegistryContext } from './index'

export const Unregister
    = (context: IServiceRegistryContext) => {
        return (name: string, version: string, ip: string, port: number): string => {
            const { services, log } = context
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            const key = name + version + ip + port
            services.delete(key)
            log(`Unregistered services ${name}, version ${version} at ${ip}:${port}`)
            return key
        }
    }