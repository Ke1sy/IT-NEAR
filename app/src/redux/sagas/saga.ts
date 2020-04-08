import {takeEvery, put, call, select} from 'redux-saga/effects';
import {profileAPI, ResultCodes} from "../../api/api";
import {
    setUserProfile,
    setUserProfileError,
    toggleProfileLoading,
    GET_USER_PROFILE,
    LOAD_PHOTO,
    setPhoto,
} from "../reducers/profile-reducer";
import {setCurrentUserInfo} from "../reducers/auth-reducer";
import {enqueueSnackbar} from "../reducers/app-reducer";
import {getCurrentUserId} from "../reducers/auth-selectors";
import * as React from "react";

type GetUserProfileType = { type: typeof GET_USER_PROFILE, id: number, isAuthenticate: boolean}
function* getUserProfileAsync({id, isAuthenticate}: GetUserProfileType)  {
    try {
        yield put(toggleProfileLoading(true));
        const data = yield call(getProfileById, id);
        if (isAuthenticate) {
            yield put(setCurrentUserInfo(data));
        } else {
            yield put(setUserProfile(data));
        }
        yield put(toggleProfileLoading(false));

    } catch (e) {
        yield put(setUserProfileError(e.message));
    }
}

type loadPhotoType = { type: typeof LOAD_PHOTO, photo: any };
function* loadPhotoAsync ({photo}: loadPhotoType) {
    try {
        const {data, resultCode, messages} = yield call(loadPhoto, photo);
        if (resultCode === ResultCodes.Success) {
            const state = yield select();
            yield put(setPhoto(data.photos));
            yield put({type: GET_USER_PROFILE, id: getCurrentUserId(state), isAuthenticate: true});
        } else {
            yield put(enqueueSnackbar({message: messages, options: {variant: 'error'}}))
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

async function getProfileById(id: number) {
    return await profileAPI.getProfile(id);
}

async function loadPhoto(photo: any) {
    return await profileAPI.loadPhoto(photo);
}

function* mySaga() {
    yield takeEvery(GET_USER_PROFILE, getUserProfileAsync);
    yield takeEvery(LOAD_PHOTO, loadPhotoAsync);
}

export default mySaga;