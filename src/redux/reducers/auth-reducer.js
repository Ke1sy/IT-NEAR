import {SET_USER_DATA} from "../constants";
import {authAPI} from "../../api/api";

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
    })
};

export default authReducer;