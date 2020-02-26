import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/reducers/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = ({dialogsReducer: {messages, dialogs, newMessageText}}) => {
    return {
        messages, dialogs, newMessageText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeMessage: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        addMessage: () => {
           dispatch(addMessageActionCreator());
        },

    }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);


export default MessagesContainer;
