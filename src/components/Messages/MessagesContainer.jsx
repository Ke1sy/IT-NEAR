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

const mapStateToProps = (state) => {
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
    connect(mapStateToProps, {sendMessage, getDialogs, getMessages, deleteMessage, spamMessage, restoreMessage}),
    withAuthRedirect
)(Messages);


export default MessagesContainer;
