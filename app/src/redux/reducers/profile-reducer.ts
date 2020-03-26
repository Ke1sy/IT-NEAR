import {profileAPI, ResultCodes} from "../../api/api";
import {reset, stopSubmit} from 'redux-form';
import {PhotosType, ProfileType} from "./types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

export const SET_STATUS = 'profile/SET_STATUS';
export const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
export const SET_USER_PROFILE_FAILED = 'profile/SET_USER_PROFILE_FAILED';
export const GET_USER_PROFILE = 'profile/GET_USER_PROFILE';
export const LOAD_PHOTO_SUCCESS = 'profile/LOAD_PHOTO_SUCCESS';
export const TOGGLE_PROFILE_LOADING = 'profile/TOGGLE_PROFILE_LOADING';

const initialState = {
    profile: null as ProfileType | null,
    profileError: null as string | null,
    status: '',
    profileIsLoading: false
};

export type InitialStateType = typeof initialState;

type ActionType = InitialStateType &  ActionsTypes & {
    photos: PhotosType
}

const profileReducer = (state: { profile: ProfileType | null; profileError: string | null; status: string, profileIsLoading: boolean } = initialState, {type, status, profile, photos, profileError}: ActionType): InitialStateType => {
    switch (type) {
        case SET_USER_PROFILE:
            return {...state, profile: profile, profileError: null};
        case SET_USER_PROFILE_FAILED:
            return {...state, profile: null, profileError};
        case SET_STATUS:
            return {...state, status};
        case LOAD_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: photos} as ProfileType};
        default:
            return state;
    }
};

export const toggleProfileLoading = (profileIsLoading: boolean) => ({
    type: TOGGLE_PROFILE_LOADING,
    profileIsLoading
});

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType };
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserProfileErrorActionType = { type: typeof SET_USER_PROFILE_FAILED, profileError: string };
export const setUserProfileError = (profileError: string): SetUserProfileErrorActionType => ({type: SET_USER_PROFILE_FAILED, profileError});

type SetStatusActionType = { type: typeof SET_STATUS, status: string };
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type LoadPhotoSuccessActionType = { type: typeof LOAD_PHOTO_SUCCESS, photos: PhotosType };
export const loadPhotoSuccess = (photos: PhotosType): LoadPhotoSuccessActionType => ({
    type: LOAD_PHOTO_SUCCESS,
    photos
});

type FormResetType = ReturnType<typeof reset>
type ActionsTypes = SetUserProfileActionType | SetStatusActionType | LoadPhotoSuccessActionType | FormResetType;
type ThunkType = ThunkAction<Promise<void | PhotosType | undefined | Error >, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (id: number, isAuthenticate: boolean = false) => ({
    type: GET_USER_PROFILE,
    id,
    isAuthenticate
});

export const loadPhoto = (photo: any): ThunkType => async (dispatch) => {
    const {data} = await profileAPI.loadPhoto(photo);
    dispatch(loadPhotoSuccess(data.photos));
};

export const getUserStatus = (id: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(id);
    dispatch(setStatus(data));
};

export const setUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.setStatus(status);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        console.error(error)
    }

};

export const setProfileInfo = (info: ProfileType, userId: number) => async (dispatch: any) => {
    const {resultCode, messages} = await profileAPI.setProfileInfo(info);
    if (resultCode === ResultCodes.Success) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("settings", {_error: messages}));
    }
};

export default profileReducer;