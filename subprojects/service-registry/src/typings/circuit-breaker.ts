export interface ICircuitBreakerState {
    failures: number
    circuit: string
    nextTry: number
    cooldownPeriod: number
}

export interface ICircuitBreakerConfig {
    failureThreshold: number,
    cooldownPeriod: number,
    requestTimeout: number
}
export interface ICircuitBreakerContext {
    store: Map<string, ICircuitBreakerState>
    config: ICircuitBreakerConfig
}
