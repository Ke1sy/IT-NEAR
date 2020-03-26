import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profileReducer.profile
};

export const getProfileError = (state: AppStateType) => {
    return state.profileReducer.profileError
};

export const getProfileIsLoading = (state: AppStateType) => {
    return state.profileReducer.profileIsLoading
};

export const getStatus = (state: AppStateType) => {
    return state.profileReducer.status
};
