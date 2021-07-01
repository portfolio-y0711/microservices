import { IConfig } from '@config/index'

export interface IDatabaseAdaptor<T> {
  create: (t: T) => Promise<T>
}

export type IApplicationConfig = IConfig

export interface IAuthTools {
  authenticate: ({
    saved,
    input,
  }: {
    saved: string
    input: string
  }) => Promise<boolean>
  tokenizer: any
  cookieCreator: any
}

export interface IHttpResponse {
  statusCode: number
  cookie?: string
  body: any
  headers?: any
  Location?: any
}

export interface IVerificationResponse {
  expriresIn: number
  token: string
}

export { IFeedCommandType } from './feed-command-type'
