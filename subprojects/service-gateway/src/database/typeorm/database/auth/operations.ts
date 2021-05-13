import { IUserCredentialAdaptor, UserCredential } from '@gateway/database'

export const ReadUserPass
    = (userCredential: IUserCredentialAdaptor) => {
        return async (userUid: string): Promise<UserCredential> => {
            return await userCredential.findUserCredential(userUid)
        }
    }