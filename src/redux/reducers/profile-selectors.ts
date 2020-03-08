import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profileReducer.profile
};

export const getStatus = (state: AppStateType) => {
    return state.profileReducer.status
};