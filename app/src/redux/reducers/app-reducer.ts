import {authenticate} from "./auth-reducer";

const SET_INITED = 'app/SET_INITED';
export const ENQUEUE_SNACKBAR = 'app/ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'app/CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'app/REMOVE_SNACKBAR';

type InitialStateType = {
    inited: boolean,
    notifications: any[],
};

const initialState: InitialStateType = {
    inited: false,
    notifications: [],
};

const appReducer = (state = initialState, {type, key, notification, dismissAll}: { type: any, key: any, dismissAll: any, notification: any }): InitialStateType => {
    switch (type) {
        case SET_INITED:
            return {
                ...state,
                inited: true
            };
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: key,
                        ...notification,
                    },
                ],
            };

        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (dismissAll || notification.key === key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            };

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== key,
                ),
            };
        default:
            return state;
    }
};

type SetAppIsInitedActionType = {
    type: typeof SET_INITED
}
export const enqueueSnackbar = (notification: any) => {
    const key = notification.options && notification.options.key;
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const removeSnackbar = (key: any) => ({
    type: REMOVE_SNACKBAR,
    key,
});

export const setAppIsInited = (): SetAppIsInitedActionType => ({type: SET_INITED});

export const appInitialize = () => (dispatch: any) => {
    let promise = dispatch(authenticate());
    Promise.all([promise]).then(() => dispatch(setAppIsInited()));
};

export default appReducer;