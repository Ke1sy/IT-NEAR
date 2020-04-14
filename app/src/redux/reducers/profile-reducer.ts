import {profileAPI, ResultCodes} from "../../api/api";
import {reset, stopSubmit} from 'redux-form';
import {PhotosType, ProfileType} from "./types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import {enqueueSnackbar} from "./app-reducer";

export const SET_STATUS = 'profile/SET_STATUS';
export const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
export const SET_USER_PROFILE_FAILED = 'profile/SET_USER_PROFILE_FAILED';
export const GET_USER_PROFILE = 'profile/GET_USER_PROFILE';
export const LOAD_PHOTO = 'profile/LOAD_PHOTO';
export const SET_PHOTO = 'profile/SET_PHOTO';
export const TOGGLE_PROFILE_LOADING = 'profile/TOGGLE_PROFILE_LOADING';
export const SET_IS_FOLLOWED = 'profile/SET_IS_FOLLOWED';
export const GET_IS_FOLLOWED = 'profile/GET_IS_FOLLOWED';

const initialState = {
    profile: null as ProfileType | null,
    profileError: null as string | null,
    status: '',
    profileIsLoading: false,
    isFollowed: false
};

export type InitialStateType = typeof initialState;

type ActionType = InitialStateType & ActionsTypes & {
    photos: PhotosType
}

const profileReducer = (state = initialState, {type, status, profile, photos, profileError, profileIsLoading, isFollowed}: ActionType): InitialStateType => {
    switch (type) {
        case SET_USER_PROFILE:
            return {...state, profile: profile, profileError: null};
        case TOGGLE_PROFILE_LOADING:
            return {...state, profileIsLoading};
        case SET_USER_PROFILE_FAILED:
            return {...state, profile: null, profileError};
        case SET_STATUS:
            return {...state, status};
        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: photos} as ProfileType};
        case SET_IS_FOLLOWED:
            return {...state, isFollowed};
        default:
            return state;
    }
};

export type GetIsUserFollowedType = { type: typeof GET_IS_FOLLOWED, id: number }
export const getIsUserFollowed = (id: number): GetIsUserFollowedType => ({type: GET_IS_FOLLOWED, id});

export const toggleProfileLoading = (profileIsLoading: boolean) => ({type: TOGGLE_PROFILE_LOADING, profileIsLoading});

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType };
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserProfileErrorActionType = { type: typeof SET_USER_PROFILE_FAILED, profileError: string };
export const setUserProfileError = (profileError: string): SetUserProfileErrorActionType => ({type: SET_USER_PROFILE_FAILED, profileError});

type SetStatusActionType = { type: typeof SET_STATUS, status: string };
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

export const loadPhoto = (photo: any) => ({type: LOAD_PHOTO, photo});

export const setPhoto = (photos: PhotosType) => ({type: SET_PHOTO, photos});

export const updateIsFollowed = (isFollowed: boolean) => ({type: SET_IS_FOLLOWED, isFollowed});

type FormResetType = ReturnType<typeof reset>
type ActionsTypes = SetUserProfileActionType | SetStatusActionType | FormResetType;
type ThunkType = ThunkAction<Promise<void | PhotosType | undefined | Error>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (id: number, updateCurrentUserInfo: boolean = false) => ({
    type: GET_USER_PROFILE,
    id,
    updateCurrentUserInfo
});

export const getUserStatus = (id: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(id);
    dispatch(setStatus(data));
};

export const setUserStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.setStatus(status);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(setStatus(status));
        dispatch(enqueueSnackbar({message: 'Status updated!', options: {variant: 'success'}}))
    }
};

export const setProfileInfo = (info: ProfileType, userId: number) => async (dispatch: any) => {
    const {resultCode, messages} = await profileAPI.setProfileInfo(info);
    if (resultCode === ResultCodes.Success) {
        dispatch(getUserProfile(userId, true));
        dispatch(enqueueSnackbar({message: 'Profile successfully updated!', options: {variant: 'success'}}))
    } else {
        dispatch(enqueueSnackbar({message: messages, options: {variant: 'error'}}));
        dispatch(stopSubmit("settings", {_error: messages}));
    }
};

export default profileReducer;