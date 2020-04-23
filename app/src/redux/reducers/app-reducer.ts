import {InferActionsTypes} from "../redux-store";

export const INIT_APP_ASYNC = 'app/INIT_APP_ASYNC';
export const ENQUEUE_SNACKBAR = 'app/ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'app/REMOVE_SNACKBAR';
const SET_INITED = 'app/SET_INITED';

type InitialStateType = {
    inited: boolean,
    notifications: any[],
};

const initialState: InitialStateType = {
    inited: false,
    notifications: [],
};

const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
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
                        ...action.notification,
                    },
                ],
            };
        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
        default:
            return state;
    }
};

export type AppActionsTypes = InferActionsTypes<typeof appActions>;
export const appActions = {
    enqueueSnackbar: (notification: any) => {
        const key = notification.options && notification.options.key;
        return {
            type: ENQUEUE_SNACKBAR,
            notification: {...notification, key: key || new Date().getTime() + Math.random()}
        } as const;
    },
    removeSnackbar: (key: any) => ({type: REMOVE_SNACKBAR, key} as const),
    setAppIsInited: () => ({type: SET_INITED} as const),
    appInitialize: () => ({type: INIT_APP_ASYNC} as const),
};

export default appReducer;