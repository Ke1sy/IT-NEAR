// import { createSelector } from 'reselect'
import {AppStateType} from "../redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersReducer.users
};


//todo example reselect

// export const getUsersSelector = createSelector(
//     getUsers,
//     (users) => {
//         return  users.filter(u => true)
//     }
// );
//

export const getPageSize = (state: AppStateType) => {
    return state.usersReducer.pageSize
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersReducer.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersReducer.currentPage
};

export const getIsLoading = (state: AppStateType) => {
    return state.usersReducer.isLoading
};

export const getFollowInProgress = (state: AppStateType) => {
    return state.usersReducer.followInProgress
};

export const getSearchQuery = (state: AppStateType) => {
    return state.usersReducer.searchQuery
};