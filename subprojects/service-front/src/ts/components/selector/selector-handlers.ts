import { IApi } from '../../api'
import { IHandler, IStore, IUser, IUserCommandType } from '../../typings'
import { IUserQueryType } from '../../typings/vo/user-query-type'
import { userProfileModalView } from './selector-views'

export const SelectorHandler
    = (api: IApi): IHandler => {

        const moduleName = 'Selector'
        let store: IStore

        const followUser
            = async (uuid: string) => {
                closeSelectorModal()
                const { FOLLOW_FRIEND } = IUserCommandType
                const result = await api.putUser(FOLLOW_FRIEND, uuid)
                if (result) {
                    const loginUser = await api.getUser(IUserQueryType.LOGIN_USER_PROFILE)
                    store.state = { ...store.state, logginUser: loginUser }
                } else {
                    return
                }
            }
        const unfollowUser
            = async (uuid: string) => {
                closeSelectorModal()
                const { UNFOLLOW_FRIEND } = IUserCommandType
                const result = await api.putUser(UNFOLLOW_FRIEND, uuid)
                if (result) {
                    const loginUser = await api.getUser(IUserQueryType.LOGIN_USER_PROFILE)
                    // store.notify()
                    store.state = { ...store.state, logginUser: loginUser }
                } else {
                    return
                }
            }
        const showUserProfile
            = async (props: IUser) => {
                await window['feedpage'].navToPage('FRIEND', { selectedUserUid: props.uuid})
                const { logginUser } = store.state
                const wrapper = document.querySelector('Profile')
                wrapper!.insertAdjacentHTML('afterbegin', userProfileModalView(logginUser!, props))
                const modalButton = document.querySelector('button[data-toggle="modal"]') as HTMLButtonElement
                modalButton.click()
            }
        const setStore = (_store: IStore) => { store = _store; return null }
        const closeSelectorModal = () => (document.querySelector('button[data-dismiss="modal"]') as HTMLButtonElement).click()
        return {
            // toggle,
            setStore,
            moduleName,
            showUserProfile,
            followUser,
            unfollowUser,
        }
    }
