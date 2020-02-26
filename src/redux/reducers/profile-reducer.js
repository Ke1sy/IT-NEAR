import {ADD_POST, SET_USER_PROFILE, UPDATE_NEW_POST_TEXT} from "../constants";
import {profileAPI} from "../../api/api";

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
    newPostText: '',
    profile: null
};

const profileReducer = (state = initialState, {type, text, profile}) => {
    switch (type) {
        case ADD_POST:
            const newPosts = [
                ...state.posts, {
                id: 5,
                text: state.newPostText,
                likesCount: 0
            }];
            return {
                ...state,
                posts: newPosts,
                newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: text};
        case SET_USER_PROFILE:
            return {...state, profile: profile};
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_TEXT, text});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (id) => (dispatch) => {
    profileAPI.getProfile(id).then(data => {
        dispatch(setUserProfile(data));
    });
};


export default profileReducer;