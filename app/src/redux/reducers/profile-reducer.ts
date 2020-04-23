import {PhotosType, ProfileType} from "./types";
import {InferActionsTypes} from "../redux-store";

export const GET_STATUS_ASYNC = 'profile/GET_STATUS_ASYNC';
export const SET_STATUS_ASYNC = 'profile/SET_STATUS_ASYNC';
export const UPDATE_USER_PROFILE_ASYNC = 'profile/UPDATE_USER_PROFILE_ASYNC';
export const GET_USER_PROFILE_ASYNC = 'profile/GET_USER_PROFILE_ASYNC';
export const GET_IS_FOLLOWED_ASYNC = 'profile/GET_IS_FOLLOWED_ASYNC';
export const UPDATE_STATUS = 'profile/UPDATE_STATUS';
export const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
export const SET_USER_PROFILE_FAILED = 'profile/SET_USER_PROFILE_FAILED';
export const LOAD_PHOTO_ASYNC = 'profile/LOAD_PHOTO_ASYNC';
export const SET_PHOTO = 'profile/SET_PHOTO';
export const TOGGLE_PROFILE_LOADING = 'profile/TOGGLE_PROFILE_LOADING';
export const SET_IS_FOLLOWED = 'profile/SET_IS_FOLLOWED';

const initialState = {
    profile: null as ProfileType | null,
    profileError: null as string | null,
    status: '',
    profileIsLoading: false,
    isFollowed: false
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {...state, profile: action.profile, profileError: null};
        case TOGGLE_PROFILE_LOADING:
            return {...state, profileIsLoading: action.profileIsLoading};
        case SET_USER_PROFILE_FAILED:
            return {...state, profile: null, profileError: action.profileError};
        case UPDATE_STATUS:
            return {...state, status: action.status};
        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
        case SET_IS_FOLLOWED:
            return {...state, isFollowed: action.isFollowed};
        default:
            return state;
    }
};

export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>;

export const profileActions = {
    toggleProfileLoading: (profileIsLoading: boolean) => ({type: TOGGLE_PROFILE_LOADING, profileIsLoading} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setUserProfileError: (profileError: string) => ({type: SET_USER_PROFILE_FAILED, profileError} as const),
    setPhoto: (photos: PhotosType) => ({type: SET_PHOTO, photos} as const),
    updateIsFollowed: (isFollowed: boolean) => ({type: SET_IS_FOLLOWED, isFollowed} as const),
    setStatus: (status: string) => ({type: UPDATE_STATUS, status} as const),
    getUserStatus: (id: number) => ({type: GET_STATUS_ASYNC, id} as const),
    setUserStatus: (status: string) => ({type: SET_STATUS_ASYNC, status} as const),
    updateProfileInfo: (info: ProfileType, userId: number) => ({type: UPDATE_USER_PROFILE_ASYNC, info, userId} as const),
    getUserProfile: (id: number, updateCurrentUserInfo: boolean = false) => ({type: GET_USER_PROFILE_ASYNC, id, updateCurrentUserInfo} as const),
    loadPhoto: (photo: any) => ({type: LOAD_PHOTO_ASYNC, photo} as const),
    getIsUserFollowed: (id: number) => ({type: GET_IS_FOLLOWED_ASYNC, id} as const),
};

export default profileReducer;