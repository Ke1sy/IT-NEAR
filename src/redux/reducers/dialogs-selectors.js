export const getMessagesList = (state) => {
    return state.dialogsReducer.messages
};

export const getDialogsList = (state) => {
    return state.dialogsReducer.dialogs
};

export const getLastUserActivityDate = (state) => {
    return state.dialogsReducer.lastUserActivityDate
};

export const getDeletedMessages = (state) => {
    return state.dialogsReducer.deletedMessages
};

export const getSpamedMessages = (state) => {
    return state.dialogsReducer.spamedMessages
};

export const getNewMessagesCount = (state) => {
    return state.dialogsReducer.newMessagesCount
};
