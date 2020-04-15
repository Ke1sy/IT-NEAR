import {PhotosType, ProfileType} from "./types";

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

type ActionsType = typeof SET_USER_PROFILE
    | typeof TOGGLE_PROFILE_LOADING
    | typeof SET_USER_PROFILE_FAILED
    | typeof UPDATE_STATUS
    | typeof SET_PHOTO
    | typeof SET_IS_FOLLOWED;

type PayloadType = InitialStateType & { photos: PhotosType, type: ActionsType }

const profileReducer = (state = initialState, {type, status, profile, photos, profileError, profileIsLoading, isFollowed}: PayloadType): InitialStateType => {
    switch (type) {
        case SET_USER_PROFILE:
            return {...state, profile: profile, profileError: null};
        case TOGGLE_PROFILE_LOADING:
            return {...state, profileIsLoading};
        case SET_USER_PROFILE_FAILED:
            return {...state, profile: null, profileError};
        case UPDATE_STATUS:
            return {...state, status};
        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: photos} as ProfileType};
        case SET_IS_FOLLOWED:
            return {...state, isFollowed};
        default:
            return state;
    }
};


export type toggleProfileLoadingType = { type: typeof TOGGLE_PROFILE_LOADING, profileIsLoading: boolean }
export const toggleProfileLoading = (profileIsLoading: boolean): toggleProfileLoadingType => ({
    type: TOGGLE_PROFILE_LOADING,
    profileIsLoading
});

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType };
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserProfileErrorActionType = { type: typeof SET_USER_PROFILE_FAILED, profileError: string };
export const setUserProfileError = (profileError: string): SetUserProfileErrorActionType => ({
    type: SET_USER_PROFILE_FAILED,
    profileError
});

export type SetPhotoType = { type: typeof SET_PHOTO, photos: PhotosType };
export const setPhoto = (photos: PhotosType): SetPhotoType => ({type: SET_PHOTO, photos});

type SetUserIsFollowedType = { type: typeof SET_IS_FOLLOWED, isFollowed: boolean };
export const updateIsFollowed = (isFollowed: boolean): SetUserIsFollowedType => ({type: SET_IS_FOLLOWED, isFollowed});

type UpdateStatusType = { type: typeof UPDATE_STATUS, status: string };
export const setStatus = (status: string): UpdateStatusType => ({type: UPDATE_STATUS, status});

export type GetStatusType = { type: typeof GET_STATUS_ASYNC, id: number };
export const getUserStatus = (id: number): GetStatusType => ({type: GET_STATUS_ASYNC, id});

export type SetUserStatusType = { type: typeof SET_STATUS_ASYNC, status: string };
export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_STATUS_ASYNC, status});

export type UpdateProfileInfoType = { type: typeof UPDATE_USER_PROFILE_ASYNC, info: ProfileType, userId: number };
export const updateProfileInfo = (info: ProfileType, userId: number): UpdateProfileInfoType => ({
    type: UPDATE_USER_PROFILE_ASYNC,
    info,
    userId
});

export type GetUserProfileType = { type: typeof GET_USER_PROFILE_ASYNC, id: number, updateCurrentUserInfo: boolean }
export const getUserProfile = (id: number, updateCurrentUserInfo: boolean = false): GetUserProfileType => ({
    type: GET_USER_PROFILE_ASYNC,
    id,
    updateCurrentUserInfo
});

export type loadPhotoType = { type: typeof LOAD_PHOTO_ASYNC, photo: any };
export const loadPhoto = (photo: any): loadPhotoType => ({type: LOAD_PHOTO_ASYNC, photo});

export type GetIsUserFollowedType = { type: typeof GET_IS_FOLLOWED_ASYNC, id: number }
export const getIsUserFollowed = (id: number): GetIsUserFollowedType => ({type: GET_IS_FOLLOWED_ASYNC, id});

export default profileReducer;