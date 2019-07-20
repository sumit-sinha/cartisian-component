const CURRENT_USER_ID = 'current_user'

export const getUserId = () => {
    return localStorage.getItem(CURRENT_USER_ID)
}

export const setUserId = (id) => {
    localStorage.setItem(CURRENT_USER_ID, id)
}

export const resetUserId = () => {
    localStorage.removeItem(CURRENT_USER_ID)
}
