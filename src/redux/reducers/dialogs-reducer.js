import {reset} from "redux-form";
import {dialogsAPI} from "../../api/api";

const SET_DIALOGS = 'dialogs/SET_DIALOGS';
const SET_MESSAGES = 'dialogs/SET_MESSAGES';
const NEW_MESSAGES_COUNT = 'dialogs/NEW_MESSAGES_COUNT';
const SET_ACTIVITY_DATE = 'dialogs/SET_ACTIVITY_DATE';
const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';
const DELETE_MESSAGE = 'dialogs/DELETE_MESSAGE';
const RESTORE_MESSAGE = 'dialogs/RESTORE_MESSAGE';
const SPAM_MESSAGE = 'dialogs/SPAM_MESSAGE';

const initialState = {
    dialogs: [],
    messages: [],
    newMessagesCount: null,
    lastUserActivityDate: null,
    deletedMessages: [],
    spamedMessages: [],
};

const dialogsReducer = (state = initialState, {type, messages, dialogs, count, userId, message, messageId}) => {
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
            return {...state,
                deletedMessages: [...state.deletedMessages].filter(id => id !== messageId),
                spamedMessages: [...state.spamedMessages].filter(id => id !== messageId)
            };
        case NEW_MESSAGES_COUNT:
            return {...state, newMessagesCount: count};
        case SET_ACTIVITY_DATE:
            let selectedUser = [...state.dialogs].find(dialog => dialog.id === Number(userId));
            if (selectedUser !== undefined) {
                return {...state, lastUserActivityDate: selectedUser.lastUserActivityDate};
            }
        default:
            return state;
    }
};

export const setDialogs = dialogs => ({type: SET_DIALOGS, dialogs});
export const setMessages = messages => ({type: SET_MESSAGES, messages});
export const setActivityDate = userId => ({type: SET_ACTIVITY_DATE, userId});
export const setNewMessagesCount = count => ({type: NEW_MESSAGES_COUNT, count});
export const addMessage = message => ({type: ADD_MESSAGE, message});
export const addMessageToDeleted = messageId => ({type: DELETE_MESSAGE, messageId});
export const addMessageToSpam = messageId => ({type: SPAM_MESSAGE, messageId});
export const restoreFromSpamDeleted = messageId => ({type: RESTORE_MESSAGE, messageId});


export const getDialogs = () => async (dispatch) => {
    const response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response));
};

export const startChat = (userId, history) => async (dispatch) => {
    const {resultCode} = await dialogsAPI.startChat(userId);
    if(resultCode === 0) {
        history.push(`/dialogs/${userId}`)
    }
};

export const sendMessage = (userId, message) => async (dispatch) => {
    const {data, resultCode} = await dialogsAPI.sendMessage(userId, message);
    if(resultCode === 0) {
        dispatch(addMessage(data.message));
        dispatch(reset('message'));
    }
};

export const getMessages = (userId) => async (dispatch) => {
    const {error, items} = await dialogsAPI.getMessages(userId);
    if(!error) {
        dispatch(setMessages(items));
        dispatch(setActivityDate(userId));
    }
};

export const deleteMessage = (messageId) => async (dispatch) => {
    const {resultCode} = await dialogsAPI.deleteMessage(messageId);
    if(resultCode === 0) {
        dispatch(addMessageToDeleted(messageId));
    }
};

export const restoreMessage = (messageId) => async (dispatch) => {
    const {resultCode} = await dialogsAPI.restoreMessage(messageId);
    if(resultCode === 0) {
        dispatch(restoreFromSpamDeleted(messageId));
    }
};

export const spamMessage = (messageId) => async (dispatch) => {
    const data = await dialogsAPI.spamMessage(messageId);
    if(data.resultCode === 0) {
        dispatch(addMessageToSpam(messageId));
    }
};

export const getNewMessagesCount = () => async (dispatch) => {
    const data = await dialogsAPI.newMessagesCount();
    dispatch(setNewMessagesCount(data));
};

export default dialogsReducer;