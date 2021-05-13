export interface IWebService {
    serviceName: string,
    serviceRegistryUrl: string,
    serviceVersion: string,
}
export const services: { production: IWebService, development: IWebService } = {
    development: {
        serviceName: '@micro/service-api',
        serviceVersion: '1.0.0',
        serviceRegistryUrl: 'http://localhost:7000',
    },
    production: {
        serviceName: '@micro/service-api',
        serviceVersion: '1.0.0',
        serviceRegistryUrl: 'http://localhost:7000',
    }
}

export default services