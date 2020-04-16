import {updateObjectInArray} from "../../utils/helpers";
import {UserType} from "./types";

export const FOLLOW_ASYNC = 'users/FOLLOW_ASYNC';
export const UNFOLLOW_ASYNC = 'users/UNFOLLOW_ASYNC';
export const REQUEST_USERS_ASYNC = 'users/REQUEST_USERS_ASYNC';

export const FOLLOW_ACCEPT = 'users/FOLLOW_ACCEPT';
export const UNFOLLOW_ACCEPT = 'users/UNFOLLOW_ACCEPT';
export const SET_USERS = 'users/SET_USERS';
export const SET_PAGE = 'users/SET_PAGE';
export const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
export const TOGGLE_IS_LOADING = 'users/TOGGLE_IS_LOADING';
export const TOGGLE_FOLLOW_IN_PROGRESS = 'users/TOGGLE_FOLLOW_IN_PROGRESS';
export const SET_SEARCH_TEXT = 'users/SET_SEARCH_TEXT';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 20 as number,
    currentPage: 1 as number,
    isLoading: true,
    followInProgress: [] as Array<number>,
    searchQuery: null as string | null,
};

type PayloadType = {
    type: ActionsTypes,
    userId: number,
    users: Array<UserType>,
    page: number,
    count: number,
    isLoading: boolean,
    inProgress: boolean,
    query: string,
};

type ActionsTypes =
    typeof FOLLOW_ACCEPT
    | typeof UNFOLLOW_ACCEPT
    | typeof SET_USERS
    | typeof SET_PAGE
    | typeof SET_TOTAL_COUNT
    | typeof TOGGLE_IS_LOADING
    | typeof SET_SEARCH_TEXT
    | typeof TOGGLE_FOLLOW_IN_PROGRESS;

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, {type, userId, users, page, count, isLoading, inProgress, query}: PayloadType): InitialStateType => {
    switch (type) {
        case FOLLOW_ACCEPT:
            return {
                ...state,
                users: updateObjectInArray(state.users, userId, "id", {followed: true})
            };
        case UNFOLLOW_ACCEPT:
            return {
                ...state,
                users: updateObjectInArray(state.users, userId, "id", {followed: false})
            };
        case SET_USERS:
            return {...state, users};
        case SET_PAGE:
            return {...state, currentPage: page};
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: count};
        case TOGGLE_IS_LOADING:
            return {...state, isLoading};
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

type SetUsersActionType = { type: typeof SET_USERS, users: Array<UserType> };
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

type SetPageActionType = { type: typeof SET_PAGE, page: number };
export const setPage = (page: number): SetPageActionType => ({type: SET_PAGE, page});

type SetUsersTotalCountActionType = { type: typeof SET_TOTAL_COUNT, count: number };
export const setUsersTotalCount = (count: number): SetUsersTotalCountActionType => ({type: SET_TOTAL_COUNT, count});

type ToggleIsLoadingActionType = { type: typeof TOGGLE_IS_LOADING, isLoading: boolean };
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({
    type: TOGGLE_IS_LOADING,
    isLoading
});

type ToggleFollowInProgressActionType = { type: typeof TOGGLE_FOLLOW_IN_PROGRESS, inProgress: boolean, userId: number };
export const toggleFollowInProgress = (inProgress: boolean, userId: number): ToggleFollowInProgressActionType => ({
    type: TOGGLE_FOLLOW_IN_PROGRESS,
    inProgress,
    userId
});

type SetSearchTextActionType = { type: typeof SET_SEARCH_TEXT, query: string }
export const setSearchText = (query: string): SetSearchTextActionType => ({type: SET_SEARCH_TEXT, query});

export const requestUsers = (currentPage: number, pageSize: number, searchText: string) => ({
    type: REQUEST_USERS_ASYNC,
    currentPage,
    pageSize,
    searchText
});

export const follow = (id: number, updateProfileFollow: boolean) => ({
    type: FOLLOW_ASYNC,
    action: 'follow',
    id,
    updateProfileFollow
});

export const unfollow = (id: number, updateProfileFollow: boolean) => ({
    type: UNFOLLOW_ASYNC,
    action: 'unfollow',
    id,
    updateProfileFollow
});

type AcceptFollowActionType = { type: typeof FOLLOW_ACCEPT, userId: number };
export const acceptFollow = (userId: number): AcceptFollowActionType => ({type: FOLLOW_ACCEPT, userId});

type AcceptUnfollowActionType = { type: typeof UNFOLLOW_ACCEPT, userId: number };
export const acceptUnfollow = (userId: number): AcceptUnfollowActionType => ({type: UNFOLLOW_ACCEPT, userId});

export default usersReducer;