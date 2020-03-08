import {reset} from "redux-form";
import {dialogsAPI} from "../../api/api";
import {DialogsType, MessagesType} from "./types";

const SET_DIALOGS = 'dialogs/SET_DIALOGS';
const SET_MESSAGES = 'dialogs/SET_MESSAGES';
const NEW_MESSAGES_COUNT = 'dialogs/NEW_MESSAGES_COUNT';
const SET_ACTIVITY_DATE = 'dialogs/SET_ACTIVITY_DATE';
const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';
const DELETE_MESSAGE = 'dialogs/DELETE_MESSAGE';
const RESTORE_MESSAGE = 'dialogs/RESTORE_MESSAGE';
const SPAM_MESSAGE = 'dialogs/SPAM_MESSAGE';

const initialState = {
    dialogs: [] as Array<DialogsType>,
    messages: [] as Array<MessagesType>,
    newMessagesCount: null as number | null,
    lastUserActivityDate: null as string | null,
    deletedMessages: [] as Array<string>,
    spamedMessages: [] as Array<string>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
    state = initialState,
    action: any
): InitialStateType => {
    const {type, messages, dialogs, count, userId, message, messageId} = action;
    switch (type) {
        case SET_DIALOGS:
            return {...state, dialogs};
        case SET_MESSAGES:
            return {...state, messages};
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

type SetDialogsActionType = {
    type: typeof SET_DIALOGS,
    dialogs: Array<DialogsType>
};
export const setDialogs = (dialogs: Array<DialogsType>): SetDialogsActionType => ({type: SET_DIALOGS, dialogs});
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

type SetNewMessagesCountActionType = {
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


export const getDialogs = () => async (dispatch: any) => {
    const response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response));
};

export const startChat = (userId: number, history: any) => async (dispatch: any) => {
    const {resultCode} = await dialogsAPI.startChat(userId);
    if (resultCode === 0) {
        history.push(`/dialogs/${userId}`)
    }
};

export const sendMessage = (userId: number, message: MessagesType) => async (dispatch: any) => {
    const {data, resultCode} = await dialogsAPI.sendMessage(userId, message);
    if (resultCode === 0) {
        dispatch(addMessage(data.message));
        dispatch(reset('message'));
    }
};

export const getMessages = (userId: number) => async (dispatch: any) => {
    const {error, items} = await dialogsAPI.getMessages(userId);
    if (!error) {
        dispatch(setMessages(items));
        dispatch(setActivityDate(userId));
    }
};

export const deleteMessage = (messageId: string) => async (dispatch: any) => {
    const {resultCode} = await dialogsAPI.deleteMessage(messageId);
    if (resultCode === 0) {
        dispatch(addMessageToDeleted(messageId));
    }
};

export const restoreMessage = (messageId: string) => async (dispatch: any) => {
    const {resultCode} = await dialogsAPI.restoreMessage(messageId);
    if (resultCode === 0) {
        dispatch(restoreFromSpamDeleted(messageId));
    }
};

export const spamMessage = (messageId: string) => async (dispatch: any) => {
    const data = await dialogsAPI.spamMessage(messageId);
    if (data.resultCode === 0) {
        dispatch(addMessageToSpam(messageId));
    }
};

export const requestNewMessagesCount = () => async (dispatch: any) => {
    const data = await dialogsAPI.newMessagesCount();
    dispatch(setNewMessagesCount(data));
};

export default dialogsReducer;