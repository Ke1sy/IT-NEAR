import {AppStateType} from "../redux-store";

export const getCurrentUserId = (state: AppStateType) => {
    return state.authReducer.userId
};

export const getCurrentUserLogin = (state: AppStateType) => {
    return state.authReducer.login
};

export const getIsAuth = (state: AppStateType) => {
    return state.authReducer.isAuth
};

export const getCurrentUserInfo = (state: AppStateType) => {
    return state.authReducer.currentUserInfo
};

export const getCaptchaUrl = (state: AppStateType) => {
    return state.authReducer.captchaUrl
};