import {PhotosType, ProfileType} from "./types";

export const UPDATE_STATUS = 'profile/UPDATE_STATUS';
export const GET_STATUS = 'profile/GET_STATUS';
export const SET_STATUS = 'profile/SET_STATUS';
export const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
export const UPDATE_USER_PROFILE = 'profile/UPDATE_USER_PROFILE';
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

type ActionType = InitialStateType & { photos: PhotosType } & {
    type: typeof SET_USER_PROFILE
        | typeof TOGGLE_PROFILE_LOADING
        | typeof SET_USER_PROFILE_FAILED
        | typeof UPDATE_STATUS
        | typeof SET_PHOTO
        | typeof SET_IS_FOLLOWED
};

const profileReducer = (state = initialState, {type, status, profile, photos, profileError, profileIsLoading, isFollowed}: ActionType): InitialStateType => {
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

export type GetIsUserFollowedType = { type: typeof GET_IS_FOLLOWED, id: number }
export const getIsUserFollowed = (id: number): GetIsUserFollowedType => ({type: GET_IS_FOLLOWED, id});

export type toggleProfileLoadingType = { type: typeof TOGGLE_PROFILE_LOADING, profileIsLoading: boolean}
export const toggleProfileLoading = (profileIsLoading: boolean): toggleProfileLoadingType => ({type: TOGGLE_PROFILE_LOADING, profileIsLoading});

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType };
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserProfileErrorActionType = { type: typeof SET_USER_PROFILE_FAILED, profileError: string };
export const setUserProfileError = (profileError: string): SetUserProfileErrorActionType => ({type: SET_USER_PROFILE_FAILED, profileError});

export type loadPhotoType = { type: typeof LOAD_PHOTO, photo: any };
export const loadPhoto = (photo: any): loadPhotoType => ({type: LOAD_PHOTO, photo});

export type SetPhotoType = { type: typeof SET_PHOTO, photos: PhotosType };
export const setPhoto = (photos: PhotosType): SetPhotoType => ({type: SET_PHOTO, photos});

type SetUserIsFollowedType = { type: typeof SET_IS_FOLLOWED, isFollowed: boolean };
export const updateIsFollowed = (isFollowed: boolean): SetUserIsFollowedType => ({type: SET_IS_FOLLOWED, isFollowed});

export type GetUserProfileType = { type: typeof GET_USER_PROFILE, id: number, updateCurrentUserInfo: boolean }
export const getUserProfile = (id: number, updateCurrentUserInfo: boolean = false): GetUserProfileType => ({type: GET_USER_PROFILE, id, updateCurrentUserInfo});

type UpdateStatusType = { type: typeof UPDATE_STATUS, status: string };
export const setStatus = (status: string): UpdateStatusType => ({type: UPDATE_STATUS, status});

export type GetStatusType = { type: typeof GET_STATUS, id: number};
export const getUserStatus = (id: number): GetStatusType => ({type: GET_STATUS, id});

export type SetUserStatusType = { type: typeof SET_STATUS, status: string};
export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_STATUS, status});

export type UpdateProfileInfoType = { type: typeof UPDATE_USER_PROFILE, info: ProfileType, userId: number};
export const updateProfileInfo = (info: ProfileType, userId: number): UpdateProfileInfoType => ({type: UPDATE_USER_PROFILE, info, userId});

export default profileReducer;