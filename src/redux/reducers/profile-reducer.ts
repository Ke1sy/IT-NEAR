import {profileAPI} from "../../api/api";
import {reset, stopSubmit} from 'redux-form';
import {PostType, ProfileType, PhotosType} from "./types";

const ADD_POST = 'profile/ADD_POST';
const SET_STATUS = 'profile/SET_STATUS';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const LOAD_PHOTO_SUCCESS = 'profile/LOAD_PHOTO_SUCCESS';


const initialState = {
    posts: [
        {
            id: 1,
            text: 'Post 1 text',
            likesCount: 2
        }, {
            id: 2,
            text: 'Post 2 text',
            likesCount: 0
        }, {
            id: 3,
            text: 'Post 3 text',
            likesCount: 7
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    const {type, text, profile, photos} = action;
    switch (type) {
        case ADD_POST:
            const newPosts = [
                ...state.posts, {
                    id: (new Date()).getTime(),
                    text: text,
                    likesCount: 0
                }];
            return {
                ...state,
                posts: newPosts,
            };
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

type AddPostTextActionType = { type: typeof ADD_POST, text: string };
export const addPostText = (text: string): AddPostTextActionType => ({type: ADD_POST, text});

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType };
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = { type: typeof SET_STATUS, text: string };
export const setStatus = (text: string): SetStatusActionType => ({type: SET_STATUS, text});

type LoadPhotoSuccessActionType = { type: typeof LOAD_PHOTO_SUCCESS, photos: PhotosType };
export const loadPhotoSuccess = (photos: PhotosType): LoadPhotoSuccessActionType => ({
    type: LOAD_PHOTO_SUCCESS,
    photos
});

export const getUserProfile = (id: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(id);
    dispatch(setUserProfile(data));
};

export const loadPhoto = (photo: any) => async (dispatch: any) => {
    const {data} = await profileAPI.loadPhoto(photo);
    dispatch(loadPhotoSuccess(data.photos));
};

export const addPost = (text: string) => (dispatch: any) => {
    dispatch(addPostText(text));
    dispatch(reset('posts'));
};

export const getUserStatus = (id: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(id);
    dispatch(setStatus(data));
};

export const setUserStatus = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.setStatus(status);
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        console.error(error)
    }

};

export const setProfileInfo = (info: ProfileType, userId: number) => async (dispatch: any) => {
    const {resultCode, messages} = await profileAPI.setProfileInfo(info);
    if (resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("settings", {_error: messages}));
    }
};

export default profileReducer;