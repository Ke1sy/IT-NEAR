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
    updateIsFollowed,
    GET_STATUS,
    setStatus,
    GetStatusType,
    SET_STATUS,
    SetUserStatusType,
    UPDATE_USER_PROFILE,
    getUserProfile, UpdateProfileInfoType, GetUserProfileType, loadPhotoType
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
import {ProfileType} from "../reducers/types";
import {stopSubmit} from "redux-form";

//PROFILE
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

function* updateProfileInfoAsync({info, userId}: UpdateProfileInfoType) {
    try {
        const {resultCode, messages} =  yield call(updateProfile, info);
        if (resultCode === ResultCodes.Success) {
            yield put(getUserProfile(userId, true));
            yield put(enqueueSnackbar({message: 'Profile successfully updated!', options: {variant: 'success'}}))
        } else {
            yield put(stopSubmit("settings", {_error: messages}));
        }
    } catch (e) {
        yield put(setUserProfileError(e.message));
    }
}

function* getStatusAsync({id}: GetStatusType) {
    try {
        const data = yield call(getUserStatus, id);
        yield put(setStatus(data));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

function* setUserStatusAsync({status}: SetUserStatusType) {
    try {
        const {resultCode} = yield call(setUserStatus, status);
        if (resultCode === ResultCodes.Success) {
            yield put(setStatus(status));
            yield put(enqueueSnackbar({message: 'Status updated!', options: {variant: 'success'}}))
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

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
async function getUserStatus(id: number) {
    return await profileAPI.getStatus(id);
}

async function setUserStatus(status: string) {
    return await profileAPI.setStatus(status)
}

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

async function updateProfile(info: ProfileType) {
    return await profileAPI.updateProfileInfo(info);
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
    yield takeEvery(GET_STATUS, getStatusAsync);
    yield takeEvery(SET_STATUS, setUserStatusAsync);
    yield takeEvery(UPDATE_USER_PROFILE, updateProfileInfoAsync);
}

export default mySaga;