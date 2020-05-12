import {DialogsType, MessagesType, ProfileType} from "./types";
import {InferActionsTypes} from "../redux-store";

export const GET_DIALOGS_ASYNC = 'dialogs/GET_DIALOGS_ASYNC';
export const GET_MESSAGES_ASYNC = 'dialogs/GET_MESSAGES_ASYNC';
export const SEND_MESSAGE_ASYNC = 'dialogs/SEND_MESSAGE_ASYNC';
export const START_CHAT_ASYNC = 'dialogs/START_CHAT_ASYNC';
export const GET_NEW_MESSAGES_COUNT_ASYNC = 'dialogs/GET_NEW_MESSAGES_COUNT_ASYNC';
export const DELETE_MESSAGE_ASYNC = 'dialogs/DELETE_MESSAGE_ASYNC';
export const RESTORE_MESSAGE_ASYNC = 'dialogs/RESTORE_MESSAGE_ASYNC';
export const SPAM_MESSAGE_ASYNC = 'dialogs/SPAM_MESSAGE_ASYNC';

export const SET_DIALOGS = 'dialogs/SET_DIALOGS';
export const SET_MESSAGES = 'dialogs/SET_MESSAGES';
export const SET_NEW_MESSAGES_COUNT = 'dialogs/SET_NEW_MESSAGES_COUNT';
export const SET_ACTIVITY_DATE = 'dialogs/SET_ACTIVITY_DATE';
export const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';
export const ADD_MESSAGE_TO_DELETED = 'dialogs/ADD_MESSAGE_TO_DELETED';
export const RESTORE_FROM_SPAM_DELETED = 'dialogs/RESTORE_FROM_SPAM_DELETED';
export const ADD_MESSAGE_TO_SPAM = 'dialogs/ADD_MESSAGE_TO_SPAM';
export const SET_SELECTED_FRIEND = 'dialogs/SET_SELECTED_FRIEND';
export const SET_MESSAGES_LOADING = 'dialogs/SET_MESSAGES_LOADING';

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
    action: DialogsActionsTypes
): InitialStateType => {

    switch (action.type) {
        case SET_DIALOGS:
            return {...state, dialogs: action.dialogs};
        case SET_MESSAGES:
            return {...state, messages: action.messages};
        case SET_MESSAGES_LOADING:
            return {...state, messagesLoading: action.messagesLoading};
        case SET_SELECTED_FRIEND:
            return {...state, selectedFriend: action.selectedFriend};
        case ADD_MESSAGE:
            return {...state, messages: [...state.messages, action.message]};
        case ADD_MESSAGE_TO_DELETED:
            return {...state, deletedMessages: [...state.deletedMessages, action.messageId]};
        case ADD_MESSAGE_TO_SPAM:
            return {...state, spamedMessages: [...state.spamedMessages, action.messageId]};
        case RESTORE_FROM_SPAM_DELETED:
            return {
                ...state,
                deletedMessages: [...state.deletedMessages].filter(id => id !== action.messageId),
                spamedMessages: [...state.spamedMessages].filter(id => id !== action.messageId)
            };
        case SET_NEW_MESSAGES_COUNT:
            return {...state, newMessagesCount: action.count};
        case SET_ACTIVITY_DATE:
            let selectedUser = [...state.dialogs].find(dialog => dialog.id === Number(action.userId));
            if (selectedUser !== undefined) {
                return {...state, lastUserActivityDate: selectedUser.lastUserActivityDate};
            } else {
                return state;
            }
        default:
            return state;
    }
};

export type DialogsActionsTypes = InferActionsTypes<typeof dialogActions>;
export const dialogActions = {
    setMessagesLoading: (messagesLoading: boolean) => ({type: SET_MESSAGES_LOADING, messagesLoading} as const),
    setDialogs: (dialogs: Array<DialogsType>) => ({type: SET_DIALOGS, dialogs} as const),
    setSelectedFriend: (selectedFriend: ProfileType) => ({type: SET_SELECTED_FRIEND, selectedFriend} as const),
    setMessages: (messages: Array<MessagesType>) => ({type: SET_MESSAGES, messages} as const),
    setActivityDate: (userId: number) => ({type: SET_ACTIVITY_DATE, userId} as const),
    setNewMessagesCount: (count: number) => ({type: SET_NEW_MESSAGES_COUNT, count} as const),
    addMessage: (message: MessagesType) => ({type: ADD_MESSAGE, message} as const),
    addMessageToDeleted: (messageId: string) => ({type: ADD_MESSAGE_TO_DELETED, messageId} as const),
    addMessageToSpam: (messageId: string) => ({type: ADD_MESSAGE_TO_SPAM, messageId} as const),
    restoreFromSpamDeleted: (messageId: string) => ({type: RESTORE_FROM_SPAM_DELETED, messageId} as const),
    startChat: (userId: number, history: any) => ({type: START_CHAT_ASYNC, userId, history} as const),
    sendMessage: (reciever: number, sender: {id: number, name: string}, message: string) => ({type: SEND_MESSAGE_ASYNC, reciever, sender, message} as const),
    getMessages: (userId: number) => ({type: GET_MESSAGES_ASYNC, userId} as const),
    deleteMessage: (messageId: string) => ({type: DELETE_MESSAGE_ASYNC, messageId} as const),
    restoreMessage: (messageId: string) => ({type: RESTORE_MESSAGE_ASYNC, messageId} as const),
    spamMessage: (messageId: string) => ({type: SPAM_MESSAGE_ASYNC, messageId} as const),
    getDialogs: () => ({type: GET_DIALOGS_ASYNC} as const),
    requestNewMessagesCount: () => ({type: GET_NEW_MESSAGES_COUNT_ASYNC} as const),
};

export default dialogsReducer;