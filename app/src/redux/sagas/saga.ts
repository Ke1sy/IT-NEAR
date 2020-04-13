import {takeEvery, put, call, select} from 'redux-saga/effects';
import {profileAPI, ResultCodes, usersAPI} from "../../api/api";
import {
    GET_USER_PROFILE,
    LOAD_PHOTO,
    GET_IS_FOLLOWED,
    setUserProfile,
    setUserProfileError,
    toggleProfileLoading,
    setPhoto,
    getIsUserFollowed,
    updateIsFollowed
} from "../reducers/profile-reducer";
import {setCurrentUserInfo} from "../reducers/auth-reducer";
import {enqueueSnackbar} from "../reducers/app-reducer";
import {getCurrentUserId} from "../reducers/auth-selectors";
import {getProfile} from "../reducers/profile-selectors";
import {
    acceptFollow,
    acceptUnfollow,
    FOLLOW,
    REQUEST_USERS,
    setPage, setSearchText, setUsers, setUsersTotalCount,
    toggleFollowInProgress, toggleIsLoading,
    UNFOLLOW,
} from "../reducers/users-reducer";

//PROFILE
type GetUserProfileType = { type: typeof GET_USER_PROFILE, id: number, updateCurrentUserInfo: boolean }
function* getUserProfileAsync({id, updateCurrentUserInfo}: GetUserProfileType) {
    try {
        const state = yield select();
        const previousId = getProfile(state)?.userId;

        if (previousId !== id) {
            yield put(toggleProfileLoading(true));
        }
        const data = yield call(getProfileById, id);
        if (updateCurrentUserInfo) {
            yield put(setCurrentUserInfo(data));
        }
        yield put(setUserProfile(data));
        if (previousId !== id) {
            yield put(toggleProfileLoading(false));
        }
    } catch (e) {
        yield put(setUserProfileError(e.message));
    }
}

type loadPhotoType = { type: typeof LOAD_PHOTO, photo: any };
function* loadPhotoAsync({photo}: loadPhotoType) {
    try {
        const {data, resultCode, messages} = yield call(loadPhoto, photo);
        if (resultCode === ResultCodes.Success) {
            const state = yield select();
            yield put(setPhoto(data.photos));
            yield put({type: GET_USER_PROFILE, id: getCurrentUserId(state), updateCurrentUserInfo: true});
        } else {
            yield put(enqueueSnackbar({message: messages, options: {variant: 'error'}}))
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

//USERS
type setUserIsFollowedType = { type: typeof GET_IS_FOLLOWED, id: number };
function* setUserIsFollowedAsync({id}: setUserIsFollowedType) {
    try {
        const isFollowed = yield call(getUserIsFollowed, id);
        yield put(updateIsFollowed(isFollowed));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type RequestUsersType = { type: typeof REQUEST_USERS, currentPage: number, pageSize: number, searchText: string }
function* requestUsersAsync({currentPage, pageSize, searchText}: RequestUsersType) {
    try {
        yield put(setSearchText(searchText));
        yield put(setPage(currentPage));
        yield put(toggleIsLoading(true));
        const {items, totalCount} = yield call(requestUsers, currentPage, pageSize, searchText);
        yield put(toggleIsLoading(false));
        yield put(setUsers(items));
        yield put(setUsersTotalCount(totalCount));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type FollowActionType = { type: typeof FOLLOW | typeof UNFOLLOW, action: 'follow' | 'unfollow', id: number, updateProfileFollow: boolean };
function* toggleFollowAsync({action, id, updateProfileFollow}: FollowActionType) {
    try {
        yield put(toggleFollowInProgress(true, id));
        const {resultCode, messages} = action === 'follow' ? yield call(followUser, id) : yield call(unfollowUser, id);
        if (resultCode === ResultCodes.Success) {
            action === 'follow' ? yield put(acceptFollow(id)) : yield put(acceptUnfollow(id));
            if (updateProfileFollow) {
                yield put(getIsUserFollowed(id));
            }
        } else {
            yield put(enqueueSnackbar({message: messages, options: {variant: 'error'}}))
        }
        yield put(toggleFollowInProgress(false, id));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

// API REQUESTS
async function getUserIsFollowed(id: number) {
    return await usersAPI.isUserFollowed(id);
}

async function followUser(id: number) {
    return await usersAPI.followUser(id)
}

async function unfollowUser(id: number) {
    return await usersAPI.unfollowUser(id)
}

async function getProfileById(id: number) {
    return await profileAPI.getProfile(id);
}

async function requestUsers(currentPage: number, pageSize: number, searchText: string) {
    return await usersAPI.getUsers(currentPage, pageSize, searchText)
}

async function loadPhoto(photo: any) {
    return await profileAPI.loadPhoto(photo);
}

//SAGA
function* mySaga() {
    yield takeEvery(GET_USER_PROFILE, getUserProfileAsync);
    yield takeEvery(LOAD_PHOTO, loadPhotoAsync);
    yield takeEvery(GET_IS_FOLLOWED, setUserIsFollowedAsync);
    yield takeEvery(FOLLOW, toggleFollowAsync);
    yield takeEvery(UNFOLLOW, toggleFollowAsync);
    yield takeEvery(REQUEST_USERS, requestUsersAsync);
}

export default mySaga;