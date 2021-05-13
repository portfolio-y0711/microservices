import { getLogger } from '@config/server'
import { IService, IServiceRegistryContext } from "@registry/services/registry"

const registry: IServiceRegistryContext = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    log: () => getLogger('@micro/service-registry', '1.0.0', 'debug'),
    config: { timeout: 10 },
    services: new Map<string, IService>()
}

export default registry