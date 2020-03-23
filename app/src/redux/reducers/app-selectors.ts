import {AppStateType} from "../redux-store";

export const getAppInited = (state: AppStateType) => {
    return state.app.inited
};