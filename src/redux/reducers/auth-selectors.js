export const getCurrentUserId = (state) => {
    return state.authReducer.userId
};

export const getCurrentUserLogin = (state) => {
    return state.authReducer.login
};

export const getIsAuth = (state) => {
    return state.authReducer.isAuth
};

export const getCaptchaUrl = (state) => {
    return state.authReducer.captchaUrl
};