import { ICircuitBreakerContext } from '@gateway/typings/circuit-breaker'
import { InitializeState } from './initialize-state'

export const IsResponsive
    = (context: ICircuitBreakerContext) => {
        return (endpoint: string): boolean => {
            const { store } = context
            // if (!store[endpoint]) ResetState(context)(endpoint)
            if (!store.has(endpoint)) InitializeState(context)(endpoint)
            const state = store.get(endpoint)
            if (state.circuit === 'CLOSED') return true
            const now = new Date().getTime() / 1000
            if (state.nextTry <= now) {
                state.circuit = 'HALF'
                return true
            }
            return false
        }
    }