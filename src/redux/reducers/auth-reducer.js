import {authAPI, securityAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {getNewMessagesCount} from "./dialogs-reducer";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, {type, userId, login, email, isAuth, captchaUrl}) => {
    switch (type) {
        case SET_USER_DATA:
            return {...state, userId, login, email, isAuth};
        case SET_CAPTCHA_URL:
            return {...state, captchaUrl};
        default:
            return state;
    }
};

export const setUserData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, userId, login, email, isAuth});
export const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl});

export const authenticate = () => async (dispatch) => {
    const {data, resultCode} = await authAPI.auth();
    if (resultCode === 0) {
        const {id, login, email} = data;
        dispatch(setUserData(id, login, email, true));
        dispatch(getNewMessagesCount());
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const {resultCode, messages} = await authAPI.login(email, password, rememberMe, captcha);
    if (resultCode === 0) {
        dispatch(authenticate());
    } else {
        if (resultCode === 10) {
            const {url} = await securityAPI.getCaptcha();
            dispatch(setCaptchaUrl(url));
        }
        dispatch(stopSubmit("login", {_error: messages}));
    }
};

export const logout = (history) => async (dispatch) => {
    const {resultCode} = await authAPI.logout();
    if (resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
        history.push('/login')
    }
};

export default authReducer;