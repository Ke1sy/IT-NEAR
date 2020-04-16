import {AppStateType} from "../redux-store";

export const getMessagesList = (state: AppStateType) => {
    return state.dialogsReducer.messages
};

export const getDialogsList = (state: AppStateType) => {
    return state.dialogsReducer.dialogs
};

export const getLastUserActivityDate = (state: AppStateType) => {
    return state.dialogsReducer.lastUserActivityDate
};

export const getDeletedMessages = (state: AppStateType) => {
    return state.dialogsReducer.deletedMessages
};

export const getSpamedMessages = (state: AppStateType) => {
    return state.dialogsReducer.spamedMessages
};

export const getNewMessagesCount = (state: AppStateType) => {
    return state.dialogsReducer.newMessagesCount
};

export const getSelectedFriend = (state: AppStateType) => {
    return state.dialogsReducer.selectedFriend
};

export const getMessagesLoading = (state: AppStateType) => {
    return state.dialogsReducer.messagesLoading
};
