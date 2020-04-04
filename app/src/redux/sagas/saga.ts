import {takeEvery, put, call} from 'redux-saga/effects';
import {profileAPI} from "../../api/api";
import {
    setUserProfile,
    setUserProfileError,
    toggleProfileLoading,
    GET_USER_PROFILE,
} from "../reducers/profile-reducer";
import {setCurrentUserInfo} from "../reducers/auth-reducer";

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

async function getProfileById(id: number) {
    return await profileAPI.getProfile(id);
}

function* mySaga() {
    yield takeEvery(GET_USER_PROFILE, getUserProfileAsync);
}

export default mySaga;