import {profileAPI} from "../../api/api";
import {reset, stopSubmit} from 'redux-form';

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
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, {type, text, profile, photos}) => {
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
            return {...state, profile: {...state.profile, photos: photos}};
        default:
            return state;
    }
};

export const addPostText = (text) => ({type: ADD_POST, text});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setStatus = text => ({type: SET_STATUS, text});
export const loadPhotoSuccess = photos => ({type: LOAD_PHOTO_SUCCESS, photos});

export const getUserProfile = (id) => (dispatch) => {
    profileAPI.getProfile(id).then(data => {
        dispatch(setUserProfile(data));
    });
};

export const loadPhoto = (photo) => (dispatch) => {
    profileAPI.loadPhoto(photo).then(({data}) => {
        dispatch(loadPhotoSuccess(data.photos));
    });
};

export const addPost = text => (dispatch) => {
    dispatch(addPostText(text));
    dispatch(reset('posts'));
};

export const getUserStatus = id => async (dispatch) => {
    const data = await profileAPI.getStatus(id);
    dispatch(setStatus(data));
};

export const setUserStatus = status => async (dispatch) => {
    const {resultCode} = await profileAPI.setStatus(status);
    if (resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const setProfileInfo = (info, userId) => async (dispatch) => {
    const {resultCode, messages} = await profileAPI.setProfileInfo(info);
    if (resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("settings", {_error: messages}));
    }
};

export default profileReducer;