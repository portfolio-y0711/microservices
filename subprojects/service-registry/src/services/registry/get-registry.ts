import semver from 'semver'
import { IService, IServiceRegistryContext } from './index'

export const Get
    = (Cleanup: (conext: IServiceRegistryContext) => () => void) => {
        return (context: IServiceRegistryContext) => {
            return (name: string, version: string): IService => {
                const { services } = context
                Cleanup(context)()
                const candidates = Array.from(services.values())
                    .filter(service => service.name === name && semver.satisfies(service.version, version))
                return candidates[Math.floor(Math.random() * candidates.length)];
            }
        }
    }