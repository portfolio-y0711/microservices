import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { default as config } from '@config/index'

import { IApplicationConfig } from '@gateway/typings'
import { IAuthTools } from '@gateway/typings'
import { IVerificationResponse } from '@gateway/typings'

export const Authenticate
    = (compare: (saved: string, input: string) => Promise<boolean>) => {
        return async function ({ saved, input }: { saved: string, input: string }) {
            return compare(saved, input)
        }
    }


export const Tokenizer
    = (config: IApplicationConfig) => {
        return function (tokenizer: {
            sign: (data: any, secret: string, option: { expiresIn: number }) => string,
            verify: (token: string, secret: string) => any
        }): any {
            const { server: { token: { secret, expiresIn } } } = config

            const sign
                = (data: any) => {
                    return ({
                        expiresIn,
                        token: tokenizer.sign(data, secret, { expiresIn })
                    })
                }
            const verify
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                = (token: string) => tokenizer.verify(token, secret)

            return {
                sign,
                verify
            }
        }
    }

export const cookieCreator
    = ({ token, expiresIn }: { token: string, expiresIn: number }): string =>
        `Authorization=${token}; Path=/; HttpOnly; Max-Age=${expiresIn}; SameSite=Lax;`

export const authenticate
    = Authenticate(async (saved: string, input: string) => {
        return await bcrypt.compare(input, saved)
    })

export const tokenizer: {
    sign: (data: any, secret: string, option: { expiresIn: number }) => IVerificationResponse,
    verify: (token: string, secret: string) => any
} = Tokenizer(config)(jwt)

export const authTools: IAuthTools = {
    authenticate,
    cookieCreator,
    tokenizer
}