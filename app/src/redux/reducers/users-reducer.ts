import {updateObjectInArray} from "../../utils/helpers";
import {UserType} from "./types";
import {InferActionsTypes} from "../redux-store";

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

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: UsersActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW_ACCEPT:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW_ACCEPT:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_PAGE:
            return {...state, currentPage: action.page};
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.count};
        case TOGGLE_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case SET_SEARCH_TEXT:
            return {...state, searchQuery: action.query};
        case TOGGLE_FOLLOW_IN_PROGRESS:
            return {
                ...state,
                followInProgress: action.inProgress ?
                    [...state.followInProgress, action.userId] :
                    state.followInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

export type UsersActionsTypes = InferActionsTypes<typeof usersActions>;

export const usersActions = {
   setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
   setPage: (page: number) => ({type: SET_PAGE, page} as const),
   setUsersTotalCount: (count: number) => ({type: SET_TOTAL_COUNT, count} as const),
   toggleIsLoading: (isLoading: boolean) => ({type: TOGGLE_IS_LOADING, isLoading} as const),
   toggleFollowInProgress: (inProgress: boolean, userId: number) => ({type: TOGGLE_FOLLOW_IN_PROGRESS, inProgress, userId} as const),
   setSearchText: (query: string) => ({type: SET_SEARCH_TEXT, query} as const),
   requestUsers: (currentPage: number, pageSize: number, searchText: string) => ({type: REQUEST_USERS_ASYNC, currentPage, pageSize, searchText} as const),
   follow: (id: number, updateProfileFollow: boolean) => ({type: FOLLOW_ASYNC, action: 'follow', id, updateProfileFollow} as const),
   unfollow: (id: number, updateProfileFollow: boolean) => ({type: UNFOLLOW_ASYNC, action: 'unfollow', id, updateProfileFollow} as const),
   acceptFollow: (userId: number) => ({type: FOLLOW_ACCEPT, userId} as const),
   acceptUnfollow: (userId: number) => ({type: UNFOLLOW_ACCEPT, userId} as const),
};

export default usersReducer;