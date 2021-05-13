import { ICircuitBreakerContext } from '@gateway/typings/circuit-breaker'

export const InitializeState
    = (context: ICircuitBreakerContext) => {
        return (endpoint: string): void => {
            const { store, config: { cooldownPeriod } } = context
            store.set(endpoint, {
                failures: 0,
                cooldownPeriod: cooldownPeriod,
                circuit: 'CLOSED',
                nextTry: 0,
            })
        }
    }