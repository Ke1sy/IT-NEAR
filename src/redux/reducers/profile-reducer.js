import {ADD_POST, SET_STATUS, SET_USER_PROFILE} from "../constants";
import {profileAPI} from "../../api/api";
import {reset, stopSubmit} from 'redux-form';

const initialState =  {
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

const profileReducer = (state = initialState, {type, text, profile}) => {
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
        default:
            return state;
    }
};

export const addPostText = (text) => ({type: ADD_POST, text});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setStatus = text => ({type: SET_STATUS, text});

export const getUserProfile = (id) => (dispatch) => {
    profileAPI.getProfile(id).then(data => {
        dispatch(setUserProfile(data));
    });
};

export const addPost = (text) => (dispatch) => {
    dispatch(addPostText(text));
    dispatch(reset('posts'));
};

export const getUserStatus = (id) => (dispatch) => {
    profileAPI.getStatus(id).then(data => {
        dispatch(setStatus(data));
    });
};

export const setUserStatus = (status) => (dispatch) => {
    profileAPI.setStatus(status).then(({resultCode}) => {
        if (resultCode === 0) {
            dispatch(setStatus(status));
        }
    });
};

export const setProfileInfo = (info, userId) => (dispatch) => {
    profileAPI.setProfileInfo(info).then(({resultCode, messages}) => {
        if (resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit("settings", {_error: messages}));
        }
    });
};

export default profileReducer;