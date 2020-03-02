import {
    FOLLOW,
    SET_PAGE,
    SET_TOTAL_COUNT,
    SET_USERS,
    TOGGLE_FOLLOW_IN_PROGRESS,
    TOGGLE_IS_LOADING,
    UNFOLLOW
} from "../constants";
import {usersAPI} from "../../api/api";

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: true,
    followInProgress: [],
};

const usersReducer = (state = initialState, {type, userId, users, page, count, isLoading, inProgress}) => {
    switch (type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === userId) {
                        user.followed = true;
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            let newUsers2 = [...state.users].map(user => {
                if (user.id === userId) {
                    user.followed = false;
                }
                return user;
            });
            return {...state, users: newUsers2};
        case SET_USERS:
            return {...state, users: users};
        case SET_PAGE:
            return {...state, currentPage: page};
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: count};
        case TOGGLE_IS_LOADING:
            return {...state, isLoading: isLoading};
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


//thunk creators

export const requestUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    usersAPI.getUsers(currentPage, pageSize).then(({items, totalCount}) => {
        dispatch(toggleIsLoading(false));
        dispatch(setUsers(items));
        dispatch(setUsersTotalCount(totalCount));
    });
};

export const setCurrentPage = (currentPage, pageSize) => (dispatch) => {
    dispatch(setPage(currentPage));
    dispatch(toggleIsLoading(true));

    usersAPI.getUsers(currentPage, pageSize)
        .then(({items}) => {
        dispatch(toggleIsLoading(false));
            dispatch(setUsers(items));
    });
};

export const follow = (id) => (dispatch) => {
    dispatch(toggleFollowInProgress(true, id));
    usersAPI.followUser(id).then(({resultCode}) => {
        if (resultCode === 0) {
            dispatch(acceptFollow(id));
        }
        dispatch(toggleFollowInProgress(false, id));
    }).catch(() =>
        dispatch(toggleFollowInProgress(false, id))
    );
};

export const unfollow = (id) => (dispatch) => {
     dispatch(toggleFollowInProgress(true, id));
    usersAPI.unfollowUser(id).then(({resultCode}) => {
        if (resultCode === 0) {
            dispatch(acceptUnfollow(id));
        }
         dispatch(toggleFollowInProgress(false, id));
    }).catch(() =>
         dispatch(toggleFollowInProgress(false, id))
    );
};


export default usersReducer;