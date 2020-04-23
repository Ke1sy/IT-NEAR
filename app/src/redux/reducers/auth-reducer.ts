import {ProfileType} from "./types";
import {InferActionsTypes} from "../redux-store";

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

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            const {userId, login, email, isAuth} = action;
            return {...state, userId, login, email, isAuth};
        case SET_CURRENT_USER_INFO:
            const {currentUserInfo} = action;
            return {...state, currentUserInfo};
        case SET_CAPTCHA_URL:
            const {captchaUrl} = action;
            return {...state, captchaUrl};
        default:
            return state;
    }
};

export type AuthActionsTypes = InferActionsTypes<typeof authActions>;
export const authActions = {
    setUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, userId, login, email, isAuth
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl} as const),
    setCurrentUserInfo: (currentUserInfo: ProfileType | null) => ({type: SET_CURRENT_USER_INFO, currentUserInfo} as const),
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => ({type: LOGIN_ASYNC, email, password, rememberMe, captcha} as const),
    logout: (history: any) => ({type: LOGOUT_ASYNC, history}  as const),
};
export default authReducer;