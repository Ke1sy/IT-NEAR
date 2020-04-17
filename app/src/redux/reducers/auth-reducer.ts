import {ProfileType} from "./types";

export const AUTH_ASYNC = 'auth/AUTH_ASYNC';
export const LOGIN_ASYNC = 'auth/LOGIN_ASYNC';
export const LOGOUT_ASYNC = 'auth/LOGOUT_ASYNC';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';
const SET_CURRENT_USER_INFO = 'auth/SET_CURRENT_USER_INFO';

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    currentUserInfo: null as ProfileType | null
};
type InitialStateType = typeof initialState
type ActionsTypes = typeof SET_USER_DATA | typeof SET_CURRENT_USER_INFO | typeof SET_CAPTCHA_URL;
type PayloadType = {
    type: ActionsTypes,
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
    captchaUrl: string,
    currentUserInfo: ProfileType | null
}

const authReducer = (
    state = initialState,
    {type, userId, login, email, isAuth, captchaUrl, currentUserInfo}: PayloadType
): InitialStateType => {
    switch (type) {
        case SET_USER_DATA:
            return {
                ...state,
                userId,
                login,
                email,
                isAuth,
            };
        case SET_CURRENT_USER_INFO:
            return {
                ...state,
                currentUserInfo
            };
        case SET_CAPTCHA_URL:
            return {...state, captchaUrl};
        default:
            return state;
    }
};

type SetUserDataActionType = { type: typeof SET_USER_DATA, userId: number | null, login: string | null, email: string | null, isAuth: boolean, }
export const setUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataActionType => ({
    type: SET_USER_DATA,
    userId,
    login,
    email,
    isAuth,
});

type SetCaptchaUrlActionType = { type: typeof SET_CAPTCHA_URL, captchaUrl: string, }
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
});

type SetCurrentUserInfoType = { type: typeof SET_CURRENT_USER_INFO, currentUserInfo: ProfileType | null }
export const setCurrentUserInfo = (currentUserInfo: ProfileType | null): SetCurrentUserInfoType => ({
    type: SET_CURRENT_USER_INFO,
    currentUserInfo
});

export type LoginType = { type: typeof LOGIN_ASYNC, email: string, password: string, rememberMe: boolean, captcha: string | null }
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): LoginType => ({
    type: LOGIN_ASYNC,
    email,
    password,
    rememberMe,
    captcha
});

export type LogoutType = { type: typeof LOGOUT_ASYNC, history: any }
export const logout = (history: any): LogoutType => ({type: LOGOUT_ASYNC, history});

export default authReducer;