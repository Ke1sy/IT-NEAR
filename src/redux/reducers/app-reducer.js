import {authenticate} from "./auth-reducer";

const SET_INITED = 'app/SET_INITED';

const initialState = {
   inited: false
};

const appReducer = (state = initialState, {type}) => {
    switch (type) {
        case SET_INITED:
            return {
                ...state,
                inited: true
            };
        default:
            return state;
    }
};

export const setAppIsInited = () => ({type: SET_INITED});

export const appInitialize = () => (dispatch) => {
    let promise = dispatch(authenticate());
    Promise.all([promise]).then(() =>  dispatch(setAppIsInited()));
};

export default appReducer;