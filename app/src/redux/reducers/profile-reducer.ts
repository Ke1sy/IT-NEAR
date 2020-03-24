import {profileAPI, ResultCodes} from "../../api/api";
import {reset, stopSubmit} from 'redux-form';
import {PhotosType, ProfileType} from "./types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

const SET_STATUS = 'profile/SET_STATUS';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const LOAD_PHOTO_SUCCESS = 'profile/LOAD_PHOTO_SUCCESS';

const initialState = {
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    const {type, text, profile, photos} = action;
    switch (type) {
        case SET_USER_PROFILE:
            return {...state, profile: profile};
        case SET_STATUS:
            return {...state, status: text};
        case LOAD_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: photos} as ProfileType};
        default:
            return state;
    }
};

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType };
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = { type: typeof SET_STATUS, text: string };
export const setStatus = (text: string): SetStatusActionType => ({type: SET_STATUS, text});

type LoadPhotoSuccessActionType = { type: typeof LOAD_PHOTO_SUCCESS, photos: PhotosType };
export const loadPhotoSuccess = (photos: PhotosType): LoadPhotoSuccessActionType => ({
    type: LOAD_PHOTO_SUCCESS,
    photos
});

type FormResetType = ReturnType<typeof reset>
type ActionsTypes = SetUserProfileActionType | SetStatusActionType | LoadPhotoSuccessActionType | FormResetType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (id: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(id);
    dispatch(setUserProfile(data));
};

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