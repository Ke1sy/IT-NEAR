import {takeEvery, put, call, select} from 'redux-saga/effects';
import {authAPI, dialogsAPI, profileAPI, ResultCodeForCaptcha, ResultCodes, securityAPI, usersAPI} from "../../api/api";
import {
    GET_USER_PROFILE_ASYNC,
    LOAD_PHOTO_ASYNC,
    GET_IS_FOLLOWED_ASYNC,
    GET_STATUS_ASYNC,
    SET_STATUS_ASYNC,
    UPDATE_USER_PROFILE_ASYNC,
    profileActions
} from "../reducers/profile-reducer";
import {AUTH_ASYNC, authActions, LOGIN_ASYNC, LOGOUT_ASYNC,} from "../reducers/auth-reducer";
import {appActions, INIT_APP_ASYNC,} from "../reducers/app-reducer";
import {getCurrentUserId} from "../reducers/auth-selectors";
import {getProfile} from "../reducers/profile-selectors";
import {
    FOLLOW_ASYNC,
    REQUEST_USERS_ASYNC,
    UNFOLLOW_ASYNC,
    usersActions,
} from "../reducers/users-reducer";
import {ProfileType} from "../reducers/types";
import {reset, stopSubmit} from "redux-form";
import {
    DELETE_MESSAGE_ASYNC,
    GET_DIALOGS_ASYNC,
    GET_MESSAGES_ASYNC,
    GET_NEW_MESSAGES_COUNT_ASYNC,
    RESTORE_MESSAGE_ASYNC,
    SEND_MESSAGE_ASYNC,
    SPAM_MESSAGE_ASYNC,
    START_CHAT_ASYNC,
    dialogActions
} from "../reducers/dialogs-reducer";
import {emitSendMessage} from "../../utils/socket";
import {getSelectedFriend} from "../reducers/dialogs-selectors";

const {enqueueSnackbar} = appActions;
const {setUserData, setCaptchaUrl, setCurrentUserInfo} = authActions;
const {setUserProfile, setUserProfileError, toggleProfileLoading, setPhoto, getIsUserFollowed, updateIsFollowed, getUserProfile, setStatus} = profileActions;
const {
    acceptFollow,
    acceptUnfollow,
    setPage,
    setSearchText,
    setUsers,
    setUsersTotalCount,
    toggleFollowInProgress,
    toggleIsLoading
} = usersActions;
const {
    requestNewMessagesCount,
    addMessage,
    addMessageToDeleted,
    addMessageToSpam,
    restoreFromSpamDeleted,
    setActivityDate,
    setDialogs,
    setMessages,
    setMessagesLoading,
    setNewMessagesCount,
    setSelectedFriend
} = dialogActions;

//PROFILE
type GetUserProfileType = ReturnType<typeof profileActions.getUserProfile>;

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

type UpdateProfileInfoType = ReturnType<typeof profileActions.updateProfileInfo>;

function* updateProfileInfoAsync({info, userId}: UpdateProfileInfoType) {
    try {
        const {resultCode, messages} = yield call(updateProfile, info);
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

type GetStatusType = ReturnType<typeof profileActions.getUserStatus>;

function* getStatusAsync({id}: GetStatusType) {
    try {
        const data = yield call(getUserStatus, id);
        yield put(setStatus(data));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type SetUserStatusType = ReturnType<typeof profileActions.setUserStatus>;

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

type loadPhotoType = ReturnType<typeof profileActions.loadPhoto>;

function* loadPhotoAsync({photo}: loadPhotoType) {
    try {
        const {data, resultCode, messages} = yield call(loadPhoto, photo);
        if (resultCode === ResultCodes.Success) {
            const state = yield select();
            yield put(setPhoto(data.photos));
            yield put({type: GET_USER_PROFILE_ASYNC, id: getCurrentUserId(state), updateCurrentUserInfo: true});
        } else {
            yield put(enqueueSnackbar({message: messages, options: {variant: 'error'}}))
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

//USERS
type setUserIsFollowedType = ReturnType<typeof profileActions.getIsUserFollowed>;

function* setUserIsFollowedAsync({id}: setUserIsFollowedType) {
    try {
        const isFollowed = yield call(getUserIsFollowed, id);
        yield put(updateIsFollowed(isFollowed));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type RequestUsersType = ReturnType<typeof usersActions.requestUsers>;

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

type FollowActionType = ReturnType<typeof usersActions.follow | typeof usersActions.unfollow>;

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

//DIALOGS
function* getDialogsAsync() {
    try {
        const response = yield call(requestDialogs);
        yield put(setDialogs(response));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type StartChatAsyncType = ReturnType<typeof dialogActions.startChat>;
function* startChatAsync({userId, history}: StartChatAsyncType) {
    try {
        const {resultCode} = yield call(startChat, userId);
        if (resultCode === ResultCodes.Success) {
            history.push(`/dialogs/${userId}`)
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type SendMessageType = ReturnType<typeof dialogActions.sendMessage>;

function* sendMessageAsync({reciever, sender, message}: SendMessageType) {
    try {
        const {data, resultCode} = yield call(sendMessage, reciever, message);
        if (resultCode === ResultCodes.Success) {
            yield put(addMessage(data.message));
            yield put(reset('message'));
            emitSendMessage({sender, reciever, msg: message});
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type DeleteMessagesType = ReturnType<typeof dialogActions.deleteMessage>;

function* deleteMessagesAsync({messageId}: DeleteMessagesType) {
    try {
        const {resultCode} = yield call(deleteMessage, messageId);
        if (resultCode === ResultCodes.Success) {
            yield put(addMessageToDeleted(messageId));
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type RestoreMessagesType = ReturnType<typeof dialogActions.restoreMessage>;

function* restoreMessagesAsync({messageId}: RestoreMessagesType) {
    try {
        const {resultCode} = yield call(restoreMessage, messageId);
        if (resultCode === ResultCodes.Success) {
            yield put(restoreFromSpamDeleted(messageId));
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type SpamMessagesType = ReturnType<typeof dialogActions.spamMessage>;

function* spamMessagesAsync({messageId}: SpamMessagesType) {
    try {
        const {resultCode} = yield call(spamMessage, messageId);
        if (resultCode === ResultCodes.Success) {
            yield put(addMessageToSpam(messageId));
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type GetMessagesType = ReturnType<typeof dialogActions.getMessages>;

function* getMessagesAsync({userId}: GetMessagesType) {
    try {
        const state = yield select();
        const sameUser = getSelectedFriend(state)?.userId === userId;
        if (!sameUser) {
            yield put(setMessagesLoading(true));
        }
        const items = yield call(getMessages, userId);
        const data = yield call(getProfileById, userId);
        yield put(setMessages(items));
        yield put(setActivityDate(userId));
        yield put(setSelectedFriend(data));
        if (!sameUser) {
            yield put(setMessagesLoading(false));
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

function* getNewMessagesCountAsync() {
    try {
        const data = yield call(newMessagesCount);
        yield put(setNewMessagesCount(data));
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

//AUTH
function* authenticateAsync() {
    try {
        const {data, resultCode} = yield call(authenticate);
        if (resultCode === ResultCodes.Success) {
            const {id, login, email} = data;
            yield put(setUserData(id, login, email, true));
            yield put(getUserProfile(id, true));
            yield put(requestNewMessagesCount());
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type LoginType = ReturnType<typeof authActions.login>;

function* loginAsync({email, password, rememberMe, captcha}: LoginType) {
    try {
        const {resultCode, messages} = yield call(login, email, password, rememberMe, captcha);
        if (resultCode === ResultCodes.Success) {
            yield put({type: AUTH_ASYNC});
        } else {
            if (resultCode === ResultCodeForCaptcha.CaptchaRequired) {
                const {url} = yield call(getCaptcha);
                yield put(setCaptchaUrl(url));
            }
            yield put(stopSubmit("login", {_error: messages}));
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

type LogoutType = ReturnType<typeof authActions.logout>;

function* logoutAsync({history}: LogoutType) {
    try {
        const {resultCode} = yield call(logout);
        if (resultCode === ResultCodes.Success) {
            yield put(setUserData(null, null, null, false));
            history.push('/login')
        }
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

function* appInitAsync() {
    try {
        yield put({type: AUTH_ASYNC});
        yield put(appActions.setAppIsInited());
    } catch (e) {
        yield put(enqueueSnackbar({message: e.message, options: {variant: 'error'}}))
    }
}

// API REQUESTS
async function authenticate() {
    return await authAPI.auth();
}

async function login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
    return await authAPI.login(email, password, rememberMe, captcha)
}

async function logout() {
    return await authAPI.logout();
}

async function getCaptcha() {
    return await securityAPI.getCaptcha();
}

async function getUserStatus(id: number) {
    return await profileAPI.getStatus(id);
}

async function loadPhoto(photo: any) {
    return await profileAPI.loadPhoto(photo);
}

async function setUserStatus(status: string) {
    return await profileAPI.setStatus(status)
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

async function getUserIsFollowed(id: number) {
    return await usersAPI.isUserFollowed(id);
}

async function followUser(id: number) {
    return await usersAPI.followUser(id)
}

async function unfollowUser(id: number) {
    return await usersAPI.unfollowUser(id)
}

async function requestDialogs() {
    return await dialogsAPI.getDialogs();
}

async function startChat(userId: number) {
    return await dialogsAPI.startChat(userId);
}

async function sendMessage(userId: number, message: string) {
    return await dialogsAPI.sendMessage(userId, message);
}

async function getMessages(userId: number) {
    return await dialogsAPI.getMessages(userId);
}

async function deleteMessage(messageId: string) {
    return await dialogsAPI.deleteMessage(messageId)
}

async function restoreMessage(messageId: string) {
    return await dialogsAPI.restoreMessage(messageId)
}

async function spamMessage(messageId: string) {
    return await dialogsAPI.spamMessage(messageId);
}

async function newMessagesCount() {
    return await dialogsAPI.newMessagesCount()
}

//SAGA
function* mySaga() {
    yield takeEvery(INIT_APP_ASYNC, appInitAsync);
    yield takeEvery(AUTH_ASYNC, authenticateAsync);
    yield takeEvery(LOGIN_ASYNC, loginAsync);
    yield takeEvery(LOGOUT_ASYNC, logoutAsync);
    yield takeEvery(GET_USER_PROFILE_ASYNC, getUserProfileAsync);
    yield takeEvery(LOAD_PHOTO_ASYNC, loadPhotoAsync);
    yield takeEvery(GET_IS_FOLLOWED_ASYNC, setUserIsFollowedAsync);
    yield takeEvery(FOLLOW_ASYNC, toggleFollowAsync);
    yield takeEvery(UNFOLLOW_ASYNC, toggleFollowAsync);
    yield takeEvery(REQUEST_USERS_ASYNC, requestUsersAsync);
    yield takeEvery(GET_STATUS_ASYNC, getStatusAsync);
    yield takeEvery(SET_STATUS_ASYNC, setUserStatusAsync);
    yield takeEvery(UPDATE_USER_PROFILE_ASYNC, updateProfileInfoAsync);
    yield takeEvery(GET_DIALOGS_ASYNC, getDialogsAsync);
    yield takeEvery(START_CHAT_ASYNC, startChatAsync);
    yield takeEvery(SEND_MESSAGE_ASYNC, sendMessageAsync);
    yield takeEvery(GET_MESSAGES_ASYNC, getMessagesAsync);
    yield takeEvery(DELETE_MESSAGE_ASYNC, deleteMessagesAsync);
    yield takeEvery(RESTORE_MESSAGE_ASYNC, restoreMessagesAsync);
    yield takeEvery(SPAM_MESSAGE_ASYNC, spamMessagesAsync);
    yield takeEvery(GET_NEW_MESSAGES_COUNT_ASYNC, getNewMessagesCountAsync);
}

export default mySaga;