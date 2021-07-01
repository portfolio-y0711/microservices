import { ICircuitBreakerContext } from '@gateway/typings/circuit-breaker'
import { InitializeState } from './initialize-state'

export const OnSuccess =
    (context: ICircuitBreakerContext) => {
        return (endpoint: string): void => {
            InitializeState(context)(endpoint)
        }
    }

export const OnFailure
    = (context: ICircuitBreakerContext) => {
        return (endpoint: string): void => {
            const { config: { failureThreshold, cooldownPeriod } } = context
            const { store } = context
            const state = store.get(endpoint)
            state.failures += 1
            if (state.failures > failureThreshold) {
                state.circuit = 'OPEN'
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                state.nextTry = new Date().getTime() / 1000 + cooldownPeriod
                console.log(`ALERT! Circuit for ${endpoint} is in state 'OPEN'`)
            }
        }
    }