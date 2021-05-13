import { IFeedQueryType, IHandler, IStore, IUser } from '../../typings'
import { IApi } from '../../api'
import { IUserQueryType } from '../../typings/vo/user-query-type'

const backward
    = (currentIndex: number, maxIndex: number) =>
        (currentIndex === 0)
            ? currentIndex = maxIndex - 1
            : currentIndex = currentIndex - 1

const forward
    = (currentIndex: number, maxIndex: number) =>
        (currentIndex === maxIndex - 1)
            ? currentIndex = 0
            : currentIndex = currentIndex + 1

const q = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement

export const LoginHandler
    = (api: IApi): IHandler => {
        const moduleName = 'Login'
        let store: IStore
        let currentIndex = 0
        let defaultIndex = 0

        const showLoginModal
            = () => {
                const [userEl, modalButton] = [
                    q(`div[data-user-index="${currentIndex = defaultIndex}"]`),
                    q(`button[data-toggle="modal"]`) as HTMLButtonElement
                ]
                userEl.style.display = ''
                modalButton.click()
                $(document).on('hide.bs.modal', function (e) {
                    const modalUsers = e.currentTarget.querySelectorAll(`div[data-user-index]`)
                    modalUsers.forEach(user => (user as HTMLElement).style.display = 'none')
                })
            }

        const changeUserInLoginModal
            = (selector: string) => {
                const maxIndex = store.state.users.length
                const userEl = q(`div[data-user-index="${currentIndex}"]`)
                userEl.style.display = 'none'
                if (selector === 'prev') currentIndex = backward(currentIndex, maxIndex)
                if (selector === 'next') currentIndex = forward(currentIndex, maxIndex)
                const newUserEl = q(`div[data-user-index="${currentIndex}"]`)
                newUserEl.style.display = ''
            }

        const processLogin
            = async (form: HTMLFormElement) => {
                closeLoginModal()
                const id = (form.elements as any)['id'].value
                const pass = (form.elements as any)['pass'].value
                let newLogginUser: IUser
                if (await api.login(id, pass)) {
                    newLogginUser = await api.getUser(IUserQueryType.LOGIN_USER_PROFILE)
                    store.state = {
                        ...store.state,
                        ...{
                            logginUser: newLogginUser,
                        }
                    }
                    await window['feedpage'].navToPage('FEEDS')
                } else {
                    await window['feedpage'].navToPage('HOME')
                }
            }

        const processLogout
            = async () => {
                await api.logout()
                await window['feedpage'].navToPage('LOGOUT')
            }

        const closeLoginModal = () => (document.querySelector('button[data-dismiss="modal"]') as HTMLButtonElement).click()
        const selectPrevUserToLogin = () => changeUserInLoginModal('prev')
        const selectNextUserToLogin = () => changeUserInLoginModal('next')
        const setDefault = (_default: number) => defaultIndex = _default
        const setStore = (_store: IStore) => { store = _store }
        return {
            moduleName,
            setStore,
            setDefault,
            showLoginModal,
            processLogin,
            processLogout,
            changeUserInLoginModal,
            selectPrevUserToLogin,
            selectNextUserToLogin,
            closeLoginModal,
        }
    }
