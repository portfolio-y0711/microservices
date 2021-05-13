export enum IUserQueryType {
    LOGIN_USER_PROFILE = 'login_user_info',
    SELECT_USER_PROFILE = 'select_user_info',
}

export interface IUserQuery {
    target: string
    query: string
}

export const iUserQueryMap: Map<IUserQueryType, IUserQuery>
    = new Map([
        [
            IUserQueryType.LOGIN_USER_PROFILE,
            {
                query: 'profile',
                target: 'login_user'
            }
        ],
        [
            IUserQueryType.SELECT_USER_PROFILE,
            {
                query: 'profile',
                target: 'select_user'
            }
        ]
    ])

export const createUserQueryType
    = (userInput: any): IUserQueryType => {
        const { LOGIN_USER_PROFILE, SELECT_USER_PROFILE } = IUserQueryType
        const { target, query } = userInput
        if (target === 'login_user') {
            switch (query) {
                case 'profile':
                    return LOGIN_USER_PROFILE
            }
        } 
        if (target === 'select_user') {
            switch (query) {
                case 'profile':
                    return SELECT_USER_PROFILE
            }
        }
        throw Error('no such user query')
    }