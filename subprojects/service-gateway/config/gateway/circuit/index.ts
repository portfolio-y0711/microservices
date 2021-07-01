import { ICircuitBreakerConfig } from '@gateway/typings/circuit-breaker'

const circuit: ICircuitBreakerConfig = {
    cooldownPeriod: 10,
    failureThreshold: 5, 
    requestTimeout: 2, 
}

export default circuit