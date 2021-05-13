import { IServiceRegistryContext } from './index'

export const Cleanup
    = (context: IServiceRegistryContext) => {
        return (): void => {
            const { services, log, config: { timeout } } = context
            const now = Math.floor(new Date().getTime() / 1000);

            Array.from(services.keys()).forEach(key => {
                if (services.get(key).timestamp + timeout < now) {
                    services.delete(key)
                    log(`Removed service ${key}`)
                }
            })
        }
    }