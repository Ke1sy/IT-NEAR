import {
    sendMessage,
    getDialogs,
    getMessages,
    deleteMessage,
    spamMessage, restoreMessage,
} from "../../redux/reducers/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";

const mapStateToProps = ({dialogsReducer: {messages, dialogs, lastUserActivityDate, deletedMessages, spamedMessages}, authReducer: {userId}}) => {
    return {
        messages, dialogs, userId, lastUserActivityDate, deletedMessages, spamedMessages
    }
};

const MessagesContainer = compose(
    connect(mapStateToProps, {sendMessage, getDialogs, getMessages, deleteMessage, spamMessage, restoreMessage}),
    // withAuthRedirect
)(Messages);


export default MessagesContainer;
