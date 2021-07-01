import { ICircuitBreakerState } from '@gateway/typings/circuit-breaker'

export const createCircuitBreakerStore 
    = () => new Map<string, ICircuitBreakerState>()