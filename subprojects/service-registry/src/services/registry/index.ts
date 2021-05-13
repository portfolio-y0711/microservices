import { Cleanup } from './services'
import { Get } from './services'
import { Register } from './services'
import { Unregister } from './services'

export interface IService {
    timestamp: number
    ip: string
    port: number
    name: string
    version: string
}

export interface IServiceRegistryContext {
    log: any,
    config: { timeout: number },
    services: Map<string, IService>
}

export interface IServiceRegistry {
    get: (name: string, version: string) => IService
    register: (name: string, version: string, ip: string, port: number) => string
    unregister: (name: string, version: string, ip: string, port: number) => string
    cleanup: () => void
}

export const ServiceRegistry
    = (context: IServiceRegistryContext): IServiceRegistry => {
        const get = Get(Cleanup)(context)
        const register = Register(Cleanup)(context)
        const unregister = Unregister(context)
        const cleanup = Cleanup(context)

        return {
            get,
            register,
            unregister,
            cleanup,
        }
    }

export const createServiceRegistryContext
    = (timeout: number): IServiceRegistryContext => ({
        log: {
            debug: () => undefined 
        },
        config: { timeout },
        services: new Map<string, IService>()
    })