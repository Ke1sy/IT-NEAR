import {sendMessage, getDialogs, getMessages} from "../../redux/reducers/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";

const mapStateToProps = ({dialogsReducer: {messages, dialogs}}) => {
    return {
        messages, dialogs
    }
};

const MessagesContainer = compose(
    connect(mapStateToProps, {sendMessage, getDialogs, getMessages}),
    // withAuthRedirect
)(Messages);


export default MessagesContainer;
