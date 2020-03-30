import React, {FC, useEffect} from "react";
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
    getMessagesList, getSelectedFriend,
    getSpamedMessages,
    getMessagesLoading
} from "../../redux/reducers/dialogs-selectors";
import {getCurrentUserInfo} from "../../redux/reducers/auth-selectors";

import {connect} from "react-redux";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogsType, MessagesType, ProfileType} from "../../redux/reducers/types";
import Messages from "./Messages";

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>,
    selectedFriend: ProfileType | null,
    currentUserInfo: ProfileType | null,
    messagesLoading: boolean
}

type MapDispatchPropsType = {
    sendMessage: (userId: number, message: string) => void
    getDialogs: () => void
    getMessages: (userId: number) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

type RouteProps = {
    match: any
};

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteProps;

const MessagesContainer:FC<PropsType> = ({getDialogs, match, ...props}) => {
    let friendId = match.params.id;

    useEffect(() => {
        getDialogs()
    }, []);

    return <Messages {...props} friendId={friendId}/>
};


const mapStateToProps = (state: AppStateType) => {
    return {
        messages: getMessagesList(state),
        dialogs: getDialogsList(state),
        lastUserActivityDate: getLastUserActivityDate(state),
        deletedMessages: getDeletedMessages(state),
        spamedMessages: getSpamedMessages(state),
        selectedFriend: getSelectedFriend(state),
        currentUserInfo: getCurrentUserInfo(state),
        messagesLoading: getMessagesLoading(state)
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, RouteProps, AppStateType>(mapStateToProps, {
        sendMessage,
        getDialogs,
        getMessages,
        deleteMessage,
        spamMessage,
        restoreMessage
    }),
    withAuthRedirect
)(MessagesContainer) as React.ComponentType<any>;
