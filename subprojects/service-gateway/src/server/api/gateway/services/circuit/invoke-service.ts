import { ICircuitBreakerContext } from '@gateway/typings/circuit-breaker'
import axios, { AxiosRequestConfig } from 'axios'
import { IsResponsive } from './is-responsive'
import { OnFailure, OnSuccess } from './on-success-failure'

export const InvokeService
    = (context: ICircuitBreakerContext) => {
        return async (requestOptions: AxiosRequestConfig): Promise<any> => {
            const { config: { requestTimeout } } = context
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const endpoint = `${requestOptions.method}:${requestOptions.url}`
            if (!IsResponsive(context)(endpoint)) return false

            // eslint-disable-next-line no-param-reassign
            requestOptions.timeout = requestTimeout * 1000

            try {
                const response = await axios(requestOptions)
                OnSuccess(context)(endpoint)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return response.data
            } catch (err) {
                OnFailure(context)(endpoint)
                return false
            }
        }
    }