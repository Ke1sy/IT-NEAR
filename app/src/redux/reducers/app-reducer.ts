import {authenticate} from "./auth-reducer";

const SET_INITED = 'app/SET_INITED';

type InitialStateType = {
   inited: boolean
};

const initialState: InitialStateType = {
   inited: false
};

const appReducer = (state = initialState, {type}: {type: any}) : InitialStateType => {
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

type SetAppIsInitedActionType = {
    type: typeof SET_INITED
}

export const setAppIsInited = (): SetAppIsInitedActionType => ({type: SET_INITED});

export const appInitialize = () => (dispatch: any) => {
    let promise = dispatch(authenticate());
    Promise.all([promise]).then(() =>  dispatch(setAppIsInited()));
};

export default appReducer;