import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from "../../api/api";
import {requestNewMessagesCount, SetNewMessagesCountActionType} from "./dialogs-reducer";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import {ProfileType} from "./types";
import {getUserProfile} from "./profile-reducer";

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

export type InitialStateType = typeof initialState

type PayloadType = {
    type: any,
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

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
}
export const setUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataActionType => ({
    type: SET_USER_DATA,
    userId,
    login,
    email,
    isAuth,
});

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string,
}

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
});

type stopSubmitType = ReturnType<typeof stopSubmit>;

type ActionsTypes = SetUserDataActionType | SetCaptchaUrlActionType | SetNewMessagesCountActionType | stopSubmitType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authenticate = (): ThunkType => async (dispatch) => {
    const {data, resultCode} = await authAPI.auth();
    if (resultCode === ResultCodes.Success) {
        const {id, login, email} = data;
        dispatch(setUserData(id, login, email, true));
        dispatch(getUserProfile(id, true));
        dispatch(requestNewMessagesCount());
    }
};

export const setCurrentUserInfo = (currentUserInfo: ProfileType | null)  => ({
    type: SET_CURRENT_USER_INFO,
    currentUserInfo
});


export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    const {resultCode, messages} = await authAPI.login(email, password, rememberMe, captcha);
    if (resultCode === ResultCodes.Success) {
        dispatch(authenticate());
    } else {
        if (resultCode === ResultCodeForCaptcha.CaptchaRequired) {
            const {url} = await securityAPI.getCaptcha();
            dispatch(setCaptchaUrl(url));
        }
        dispatch(stopSubmit("login", {_error: messages}));
    }
};

export const logout = (history: any): ThunkType => async (dispatch) => {
    const {resultCode} = await authAPI.logout();
    if (resultCode === ResultCodes.Success) {
        dispatch(setUserData(null, null, null, false));
        history.push('/login')
    }
};

export default authReducer;