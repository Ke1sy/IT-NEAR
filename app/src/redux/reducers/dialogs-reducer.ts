import {reset} from "redux-form";
import {dialogsAPI, profileAPI, ResultCodes} from "../../api/api";
import {DialogsType, MessagesType, ProfileType} from "./types";
import { ThunkAction } from 'redux-thunk'
import {AppStateType} from "../redux-store";

const SET_DIALOGS = 'dialogs/SET_DIALOGS';
const SET_MESSAGES = 'dialogs/SET_MESSAGES';
const NEW_MESSAGES_COUNT = 'dialogs/NEW_MESSAGES_COUNT';
const SET_ACTIVITY_DATE = 'dialogs/SET_ACTIVITY_DATE';
const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';
const DELETE_MESSAGE = 'dialogs/DELETE_MESSAGE';
const RESTORE_MESSAGE = 'dialogs/RESTORE_MESSAGE';
const SPAM_MESSAGE = 'dialogs/SPAM_MESSAGE';
const SET_SELECTED_FRIEND = 'dialogs/SET_SELECTED_FRIEND';
const SET_MESSAGES_LOADING = 'dialogs/SET_MESSAGES_LOADING';

const initialState = {
    dialogs: [] as Array<DialogsType>,
    messages: [] as Array<MessagesType>,
    newMessagesCount: null as number | null,
    lastUserActivityDate: null as string | null,
    deletedMessages: [] as Array<string>,
    spamedMessages: [] as Array<string>,
    selectedFriend: null as ProfileType | null,
    messagesLoading: false
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
    state = initialState,
    action: any
): InitialStateType => {
    const {type, messages, dialogs, count, userId, message, messageId, selectedFriend, messagesLoading} = action;
    switch (type) {
        case SET_DIALOGS:
            return {...state, dialogs};
        case SET_MESSAGES:
            return {...state, messages};
        case SET_MESSAGES_LOADING:
            return {...state, messagesLoading};
        case SET_SELECTED_FRIEND:
            return {...state, selectedFriend};
        case ADD_MESSAGE:
            return {...state, messages: [...state.messages, message]};
        case DELETE_MESSAGE:
            return {...state, deletedMessages: [...state.deletedMessages, messageId]};
        case SPAM_MESSAGE:
            return {...state, spamedMessages: [...state.spamedMessages, messageId]};
        case RESTORE_MESSAGE:
            return {
                ...state,
                deletedMessages: [...state.deletedMessages].filter(id => id !== messageId),
                spamedMessages: [...state.spamedMessages].filter(id => id !== messageId)
            };
        case NEW_MESSAGES_COUNT:
            return {...state, newMessagesCount: count};
        case SET_ACTIVITY_DATE:
            let selectedUser = [...state.dialogs].find(dialog => dialog.id === Number(userId));
            if (selectedUser !== undefined) {
                return {...state, lastUserActivityDate: selectedUser.lastUserActivityDate};
            } else {
                return state;
            }
        default:
            return state;
    }
};

type SetMessagesLoadingActionType = {
    type: typeof SET_MESSAGES_LOADING,
    messagesLoading: boolean
};
export const setMessagesLoading = (messagesLoading: boolean): SetMessagesLoadingActionType => ({type: SET_MESSAGES_LOADING, messagesLoading});

type SetDialogsActionType = {
    type: typeof SET_DIALOGS,
    dialogs: Array<DialogsType>
};
export const setDialogs = (dialogs: Array<DialogsType>): SetDialogsActionType => ({type: SET_DIALOGS, dialogs});

export const setSelectedFriend = (selectedFriend: ProfileType) => ({
    type: SET_SELECTED_FRIEND,
    selectedFriend
});

type SetMessagesActionType = {
    type: typeof SET_MESSAGES,
    messages: Array<MessagesType>
}

export const setMessages = (messages: Array<MessagesType>): SetMessagesActionType => ({type: SET_MESSAGES, messages});

type SetActivityDateActionType = {
    type: typeof SET_ACTIVITY_DATE,
    userId: number
}
export const setActivityDate = (userId: number): SetActivityDateActionType => ({type: SET_ACTIVITY_DATE, userId});

export type SetNewMessagesCountActionType = {
    type: typeof NEW_MESSAGES_COUNT,
    count: number
}
export const setNewMessagesCount = (count: number): SetNewMessagesCountActionType => ({
    type: NEW_MESSAGES_COUNT,
    count
});

type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    message: MessagesType
}
export const addMessage = (message: MessagesType): AddMessageActionType => ({type: ADD_MESSAGE, message});

type AddMessageToDeletedActionType = {
    type: typeof DELETE_MESSAGE,
    messageId: string
}
export const addMessageToDeleted = (messageId: string): AddMessageToDeletedActionType => ({
    type: DELETE_MESSAGE,
    messageId
});

type AddMessageToSpamActionType = {
    type: typeof SPAM_MESSAGE,
    messageId: string
}
export const addMessageToSpam = (messageId: string): AddMessageToSpamActionType => ({type: SPAM_MESSAGE, messageId});

type RestoreFromSpamDeletedActionType = {
    type: typeof RESTORE_MESSAGE,
    messageId: string
}
export const restoreFromSpamDeleted = (messageId: string): RestoreFromSpamDeletedActionType => ({
    type: RESTORE_MESSAGE,
    messageId
});

type FormResetType = ReturnType<typeof reset>

type ActionsTypes =
    SetDialogsActionType
    | SetMessagesActionType
    | SetActivityDateActionType
    | SetNewMessagesCountActionType
    | AddMessageActionType
    | AddMessageToDeletedActionType
    | AddMessageToSpamActionType
    | RestoreFromSpamDeletedActionType
    | SetMessagesLoadingActionType
    | FormResetType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getDialogs = (): ThunkType => async (dispatch) => {
    const response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response));
};

export const startChat = (userId: number, history: any): ThunkType => async () => {
    const {resultCode} = await dialogsAPI.startChat(userId);
    if (resultCode === ResultCodes.Success) {
        history.push(`/dialogs/${userId}`)
    }
};

export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch) => {
    const {data, resultCode} = await dialogsAPI.sendMessage(userId, message);
    if (resultCode === ResultCodes.Success) {
        dispatch(addMessage(data.message));
        dispatch(reset('message'));
    }
};

export const getMessages = (userId: number): ThunkType => async (dispatch) => {
    dispatch(setMessagesLoading(true));
    const {error, items} = await dialogsAPI.getMessages(userId);
    const data = await profileAPI.getProfile(userId);
    if (!error) {
        dispatch(setMessages(items));
        dispatch(setActivityDate(userId));
        dispatch(setSelectedFriend(data));
    }
    dispatch(setMessagesLoading(false));

};

export const deleteMessage = (messageId: string): ThunkType => async (dispatch) => {
    const {resultCode} = await dialogsAPI.deleteMessage(messageId);
    if (resultCode === ResultCodes.Success) {
        dispatch(addMessageToDeleted(messageId));
    }
};

export const restoreMessage = (messageId: string): ThunkType => async (dispatch) => {
    const {resultCode} = await dialogsAPI.restoreMessage(messageId);
    if (resultCode === ResultCodes.Success) {
        dispatch(restoreFromSpamDeleted(messageId));
    }
};

export const spamMessage = (messageId: string): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.spamMessage(messageId);
    if (data.resultCode === ResultCodes.Success) {
        dispatch(addMessageToSpam(messageId));
    }
};

export const requestNewMessagesCount = (): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.newMessagesCount();
    dispatch(setNewMessagesCount(data));
};

export default dialogsReducer;