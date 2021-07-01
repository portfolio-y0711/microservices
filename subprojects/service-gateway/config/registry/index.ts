export interface IRegistryConfig {
    serviceName: string,
    serviceRegistryUrl: string,
    serviceVersion: string,
}

export const services: { production: IRegistryConfig, development: IRegistryConfig } = {
    development: {
        serviceName: '@micro/service-api',
        serviceVersion: '1.0.0',
        serviceRegistryUrl: 'http://service-registry:7000',
    },
    production: {
        serviceName: '@micro/service-api',
        serviceVersion: '1.0.0',
        serviceRegistryUrl: 'http://service-registry:7000',
    }
}

export default services
