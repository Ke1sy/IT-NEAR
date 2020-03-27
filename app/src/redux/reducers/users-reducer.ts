import {ResultCodes, usersAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/helpers";
import {UserType} from "./types";
import {Dispatch} from "redux";
import {AppStateType} from "../redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_PAGE = 'users/SET_PAGE';
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
const TOGGLE_IS_LOADING = 'users/TOGGLE_IS_LOADING';
const TOGGLE_FOLLOW_IN_PROGRESS = 'users/TOGGLE_FOLLOW_IN_PROGRESS';
const SET_SEARCH_TEXT = 'users/SET_SEARCH_TEXT';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 20 as number,
    currentPage: 1 as number,
    isLoading: true,
    followInProgress: [] as Array<number>,
    searchQuery: null as string | null
};

type PayloadType = {
    type: any,
    userId: number,
    users: Array<UserType>,
    page: number,
    count: number,
    isLoading: boolean,
    inProgress: boolean,
    query: string
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, {type, userId, users, page, count, isLoading, inProgress, query}: PayloadType): InitialStateType => {
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

type AcceptFollowActionType = {
    type: typeof FOLLOW,
    userId: number
};
export const acceptFollow = (userId: number): AcceptFollowActionType => ({type: FOLLOW, userId});
type AcceptUnfollowActionType = {
    type: typeof UNFOLLOW,
    userId: number
};
export const acceptUnfollow = (userId: number): AcceptUnfollowActionType => ({type: UNFOLLOW, userId});
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type SetPageActionType = {
    type: typeof SET_PAGE,
    page: number
};
export const setPage = (page: number): SetPageActionType => ({type: SET_PAGE, page});
type SetUsersTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT,
    count: number
};
export const setUsersTotalCount = (count: number): SetUsersTotalCountActionType => ({type: SET_TOTAL_COUNT, count});
type ToggleIsLoadingActionType = {
    type: typeof TOGGLE_IS_LOADING,
    isLoading: boolean
};
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({
    type: TOGGLE_IS_LOADING,
    isLoading
});
type ToggleFollowInProgressActionType = {
    type: typeof TOGGLE_FOLLOW_IN_PROGRESS,
    inProgress: boolean,
    userId: number
};
export const toggleFollowInProgress = (inProgress: boolean, userId: number): ToggleFollowInProgressActionType => ({
    type: TOGGLE_FOLLOW_IN_PROGRESS,
    inProgress,
    userId
});
type SetSearchTextActionType = {
    type: typeof SET_SEARCH_TEXT,
    query: string
}
export const setSearchText = (query: string): SetSearchTextActionType => ({type: SET_SEARCH_TEXT, query});

type ActionsTypes =
    AcceptFollowActionType
    | AcceptUnfollowActionType
    | SetUsersActionType
    | SetPageActionType
    | SetUsersTotalCountActionType
    | ToggleIsLoadingActionType
    | ToggleFollowInProgressActionType
    | SetSearchTextActionType

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

//thunk creators
export const requestUsers = (currentPage: number, pageSize: number, searchText: string): ThunkType => async (dispatch) => {
    dispatch(setSearchText(searchText));
    dispatch(setPage(currentPage));
    dispatch(toggleIsLoading(true));
    const {items, totalCount} = await usersAPI.getUsers(currentPage, pageSize, searchText);
    dispatch(toggleIsLoading(false));
    dispatch(setUsers(items));
    dispatch(setUsersTotalCount(totalCount));
};


const _followUnfollow = async (dispatch: DispatchType, id: number, apiMethod: any, actionCreator: typeof acceptFollow | typeof acceptUnfollow) => {
    dispatch(toggleFollowInProgress(true, id));
    const {resultCode} = await apiMethod(id);
    if (resultCode === ResultCodes.Success) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleFollowInProgress(false, id));
};

export const follow = (id: number): ThunkType => async (dispatch) => {
    _followUnfollow(dispatch, id, usersAPI.followUser.bind(usersAPI), acceptFollow);
};

export const unfollow = (id: number): ThunkType => async (dispatch) => {
    _followUnfollow(dispatch, id, usersAPI.unfollowUser.bind(usersAPI), acceptUnfollow);
};

export default usersReducer;