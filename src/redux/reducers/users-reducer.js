import {usersAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_PAGE = 'users/SET_PAGE';
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
const TOGGLE_IS_LOADING = 'users/TOGGLE_IS_LOADING';
const TOGGLE_FOLLOW_IN_PROGRESS = 'users/TOGGLE_FOLLOW_IN_PROGRESS';
const SET_SEARCH_TEXT = 'users/SET_SEARCH_TEXT';

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: true,
    followInProgress: [],
    searchQuery: ''
};

const usersReducer = (state = initialState, {type, userId, users, page, count, isLoading, inProgress, query}) => {
    switch (type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, userId, "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, userId, "id", {followed: false})

            };
        case SET_USERS:
            return {...state, users: users};
        case SET_PAGE:
            return {...state, currentPage: page};
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: count};
        case TOGGLE_IS_LOADING:
            return {...state, isLoading: isLoading};
        case SET_SEARCH_TEXT:
            return {...state, searchQuery: query};
        case TOGGLE_FOLLOW_IN_PROGRESS:
            return {
                ...state,
                followInProgress: inProgress ?
                    [...state.followInProgress, userId] :
                    state.followInProgress.filter(id => id !== userId)
            };
        default:
            return state;
    }
};

export const acceptFollow = userId => ({type: FOLLOW, userId});
export const acceptUnfollow = userId => ({type: UNFOLLOW, userId});
export const setUsers = users => ({type: SET_USERS, users});
export const setPage = page => ({type: SET_PAGE, page});
export const setUsersTotalCount = count => ({type: SET_TOTAL_COUNT, count});
export const toggleIsLoading = isLoading => ({type: TOGGLE_IS_LOADING, isLoading});
export const toggleFollowInProgress = (inProgress, userId) => ({type: TOGGLE_FOLLOW_IN_PROGRESS, inProgress, userId});
export const setSearchText = query => ({type: SET_SEARCH_TEXT, query});

//thunk creators
export const requestUsers = (currentPage, pageSize, searchText) => async (dispatch) => {
    dispatch(setSearchText(searchText));
    dispatch(setPage(currentPage));
    dispatch(toggleIsLoading(true));
    const {items, totalCount} = await usersAPI.getUsers(currentPage, pageSize, searchText);
    dispatch(toggleIsLoading(false));
    dispatch(setUsers(items));
    dispatch(setUsersTotalCount(totalCount));
};


const followUnfollow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleFollowInProgress(true, id));
    const {resultCode} = await apiMethod(id);
    if (resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleFollowInProgress(false, id));
};

export const follow = id => async (dispatch) => {
    followUnfollow(dispatch, id, usersAPI.followUser.bind(usersAPI), acceptFollow);
};

export const unfollow = id => async (dispatch) => {
    followUnfollow(dispatch, id, usersAPI.unfollowUser.bind(usersAPI), acceptUnfollow);
};

export default usersReducer;