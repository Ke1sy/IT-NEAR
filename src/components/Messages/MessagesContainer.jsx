import React from 'react';
import {addMessage, updateNewMessageText} from "../../redux/reducers/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";

const mapStateToProps = ({dialogsReducer: {messages, dialogs, newMessageText}}) => {
    return {
        messages, dialogs, newMessageText
    }
};

const MessagesContainer = compose(
    connect(mapStateToProps, {addMessage, updateNewMessageText}),
    withAuthRedirect
)(Messages);


export default MessagesContainer;
