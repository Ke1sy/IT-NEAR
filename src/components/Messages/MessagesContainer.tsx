import {
    sendMessage,
    getDialogs,
    getMessages,
    deleteMessage,
    spamMessage,
    restoreMessage,
} from "../../redux/reducers/dialogs-reducer";
import {
    getDeletedMessages,
    getDialogsList,
    getLastUserActivityDate,
    getMessagesList,
    getSpamedMessages
} from "../../redux/reducers/dialogs-selectors";
import {getCurrentUserId} from "../../redux/reducers/auth-selectors";

import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogsType, MessagesType} from "../../redux/reducers/types";

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    userId: number | null
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>
}

type MapDispatchPropsType = {
    sendMessage: (userId: number, message: MessagesType) => void
    getDialogs: () => void
    getMessages: (userId: number) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

const mapStateToProps = (state: AppStateType) => {
    return {
        messages: getMessagesList(state),
        dialogs: getDialogsList(state),
        userId: getCurrentUserId(state),
        lastUserActivityDate: getLastUserActivityDate(state),
        deletedMessages: getDeletedMessages(state),
        spamedMessages: getSpamedMessages(state)
    }
};

const MessagesContainer = compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {sendMessage, getDialogs, getMessages, deleteMessage, spamMessage, restoreMessage}),
    withAuthRedirect
)(Messages);


export default MessagesContainer as React.ComponentType<any>;
