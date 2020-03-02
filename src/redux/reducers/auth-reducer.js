import {SET_USER_DATA} from "../constants";
import {authAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, {type, userId, login, email, isAuth}) => {
    switch (type) {
        case SET_USER_DATA:
            return {...state, userId, login, email, isAuth};
        default:
            return state;
    }
};


export const setUserData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, userId, login, email, isAuth});

export const authenticate = () => (dispatch) => {
    authAPI.auth().then(({data, resultCode}) => {
        if(resultCode === 0) {
            const {id, login, email} = data;
            dispatch(setUserData(id, login, email, true));
        }
    });

    return 'User auth success'
};


export const login = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha).then(({resultCode, messages}) => {
        if(resultCode === 0) {
            dispatch(authenticate());
        } else {
            dispatch(stopSubmit("login", {_error: messages}));
        }
    })
};

export const logout = (history) => (dispatch) => {
    authAPI.logout().then((data) => {
        if(data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
            history.push('/login')
        }
    })
};

export default authReducer;