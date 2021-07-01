import { InitializeState } from './initialize-state'
import { InvokeService } from './invoke-service'
import { OnSuccess, OnFailure } from './on-success-failure'
import { IsResponsive } from './is-responsive'
import { ICircuitBreakerContext } from '@gateway/typings/circuit-breaker'
import { AxiosRequestConfig} from 'axios'

export interface ICircuitBreaker {
    initializeState: (endpoint: string) => void
    invokeService: (requestOptions: AxiosRequestConfig) => Promise<any>
    onSuccess: (endpoint: string) => void
    onFailure: (endpoint: string) => void
    isResponsive: (endpoint: string) => boolean
}

export const CircuitBreaker
    = (context: ICircuitBreakerContext): ICircuitBreaker => {
        const initializeState = InitializeState(context)
        const invokeService = InvokeService(context)
        const onSuccess = OnSuccess(context)
        const onFailure = OnFailure(context)
        const isResponsive = IsResponsive(context)

        return {
            initializeState,
            invokeService,
            onSuccess,
            onFailure,
            isResponsive,
        }
    }

export { createCircuitBreakerStore } from './create-store'