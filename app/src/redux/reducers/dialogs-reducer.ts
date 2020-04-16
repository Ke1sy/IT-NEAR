import {DialogsType, MessagesType, ProfileType} from "./types";

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

type PayloadType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessagesType>,
    count: number | null,
    userId: number,
    message: MessagesType,
    messageId: string,
    selectedFriend: ProfileType,
    messagesLoading: boolean,
    type: ActionsTypes
};

type ActionsTypes =
    typeof SET_DIALOGS
    | typeof SET_MESSAGES
    | typeof SET_MESSAGES_LOADING
    | typeof SET_SELECTED_FRIEND
    | typeof ADD_MESSAGE
    | typeof ADD_MESSAGE_TO_DELETED
    | typeof ADD_MESSAGE_TO_SPAM
    | typeof RESTORE_FROM_SPAM_DELETED
    | typeof SET_NEW_MESSAGES_COUNT
    | typeof SET_ACTIVITY_DATE;

const dialogsReducer = (
    state = initialState,
    {type, messages, dialogs, count, userId, message, messageId, selectedFriend, messagesLoading}: PayloadType
): InitialStateType => {

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
        case ADD_MESSAGE_TO_DELETED:
            return {...state, deletedMessages: [...state.deletedMessages, messageId]};
        case ADD_MESSAGE_TO_SPAM:
            return {...state, spamedMessages: [...state.spamedMessages, messageId]};
        case RESTORE_FROM_SPAM_DELETED:
            return {
                ...state,
                deletedMessages: [...state.deletedMessages].filter(id => id !== messageId),
                spamedMessages: [...state.spamedMessages].filter(id => id !== messageId)
            };
        case SET_NEW_MESSAGES_COUNT:
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

type SetMessagesLoadingActionType = { type: typeof SET_MESSAGES_LOADING, messagesLoading: boolean };
export const setMessagesLoading = (messagesLoading: boolean): SetMessagesLoadingActionType => ({type: SET_MESSAGES_LOADING, messagesLoading});

type SetDialogsActionType = { type: typeof SET_DIALOGS, dialogs: Array<DialogsType> };
export const setDialogs = (dialogs: Array<DialogsType>): SetDialogsActionType => ({type: SET_DIALOGS, dialogs});

type SetSelectedFriendType = { type: typeof SET_SELECTED_FRIEND, selectedFriend: ProfileType };
export const setSelectedFriend = (selectedFriend: ProfileType): SetSelectedFriendType => ({type: SET_SELECTED_FRIEND, selectedFriend});

type SetMessagesActionType = { type: typeof SET_MESSAGES, messages: Array<MessagesType>}
export const setMessages = (messages: Array<MessagesType>): SetMessagesActionType => ({type: SET_MESSAGES, messages});

type SetActivityDateActionType = { type: typeof SET_ACTIVITY_DATE, userId: number }
export const setActivityDate = (userId: number): SetActivityDateActionType => ({type: SET_ACTIVITY_DATE, userId});

export type SetNewMessagesCountActionType = { type: typeof SET_NEW_MESSAGES_COUNT, count: number }
export const setNewMessagesCount = (count: number): SetNewMessagesCountActionType => ({type: SET_NEW_MESSAGES_COUNT, count});

type AddMessageActionType = { type: typeof ADD_MESSAGE, message: MessagesType }
export const addMessage = (message: MessagesType): AddMessageActionType => ({type: ADD_MESSAGE, message});

type AddMessageToDeletedActionType = { type: typeof ADD_MESSAGE_TO_DELETED, messageId: string }
export const addMessageToDeleted = (messageId: string): AddMessageToDeletedActionType => ({type: ADD_MESSAGE_TO_DELETED, messageId});

type AddMessageToSpamActionType = { type: typeof ADD_MESSAGE_TO_SPAM, messageId: string }
export const addMessageToSpam = (messageId: string): AddMessageToSpamActionType => ({type: ADD_MESSAGE_TO_SPAM, messageId});

type RestoreFromSpamDeletedActionType = { type: typeof RESTORE_FROM_SPAM_DELETED, messageId: string }
export const restoreFromSpamDeleted = (messageId: string): RestoreFromSpamDeletedActionType => ({type: RESTORE_FROM_SPAM_DELETED, messageId});

export type StartChatType = { type: typeof START_CHAT_ASYNC, userId: number, history: any };
export const startChat = (userId: number, history: any): StartChatType => ({type: START_CHAT_ASYNC, userId, history});

export type SendMessageType = { type: typeof SEND_MESSAGE_ASYNC, userId: number, message: string };
export const sendMessage = (userId: number, message: string): SendMessageType => ({type: SEND_MESSAGE_ASYNC, userId, message});

export type GetMessagesType = { type: typeof GET_MESSAGES_ASYNC, userId: number }
export const getMessages = (userId: number): GetMessagesType => ({type: GET_MESSAGES_ASYNC, userId});

export type DeleteMessagesType = { type: typeof DELETE_MESSAGE_ASYNC, messageId: string }
export const deleteMessage = (messageId: string): DeleteMessagesType => ({type: DELETE_MESSAGE_ASYNC, messageId});

export type RestoreMessagesType = { type: typeof RESTORE_MESSAGE_ASYNC, messageId: string }
export const restoreMessage = (messageId: string): RestoreMessagesType => ({type: RESTORE_MESSAGE_ASYNC, messageId});

export type SpamMessagesType = { type: typeof SPAM_MESSAGE_ASYNC, messageId: string }
export const spamMessage = (messageId: string): SpamMessagesType => ({type: SPAM_MESSAGE_ASYNC, messageId});

export const requestNewMessagesCount = () => ({type: GET_NEW_MESSAGES_COUNT_ASYNC});
export const getDialogs = () => ({type: GET_DIALOGS_ASYNC});

export default dialogsReducer;