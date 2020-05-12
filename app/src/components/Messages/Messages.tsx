import React, {FC} from 'react';
import Dialog from "./Dialogs/Dialog";
import MessagesChat from "./Chat/MessagesChat";
import {DialogsType, MessagesType, ProfileType} from "../../redux/reducers/types";
import {Paper, List, WithStyles} from "@material-ui/core";
import EmptyChat from "./Chat/EmptyChat";
import classNames from "classnames";
import withMessagesStyles from "./messagesStyles";

type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>
    selectedFriend: ProfileType | null
    currentUserInfo: ProfileType | null,
    friendId: number,
    messagesLoading: boolean,
    sendMessage: (reciever: number, sender: {id: number, name: string}, message: string) => void
    getMessages: (userId: number) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
    requestNewMessagesCount: () => void
    getDialogs: () => void
}

const Messages: FC<PropsType & WithStyles> = ({
                                                  classes,
                                                  messages,
                                                  deletedMessages,
                                                  dialogs,
                                                  sendMessage,
                                                  getMessages,
                                                  deleteMessage,
                                                  spamMessage,
                                                  lastUserActivityDate,
                                                  restoreMessage,
                                                  spamedMessages,
                                                  selectedFriend,
                                                  currentUserInfo,
                                                  friendId,
                                                  messagesLoading,
                                                  requestNewMessagesCount,
                                                  getDialogs
                                              }) => {
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <List className={classNames(classes.list, {[classes.hiddenList]: friendId})} component="div">
                    {dialogs.map(user =>
                        <Dialog
                            key={user.id}
                            user={user}
                        />)
                    }
                </List>
                <div className={classes.content}>
                    {currentUserInfo && friendId ?
                        <MessagesChat
                            messagesLoading={messagesLoading}
                            deletedMessages={deletedMessages}
                            spamedMessages={spamedMessages}
                            messages={messages}
                            friendId={friendId}
                            sendMessage={sendMessage}
                            getMessages={getMessages}
                            deleteMessage={deleteMessage}
                            spamMessage={spamMessage}
                            lastUserActivityDate={lastUserActivityDate}
                            restoreMessage={restoreMessage}
                            selectedFriend={selectedFriend}
                            currentUserInfo={currentUserInfo}
                            requestNewMessagesCount={requestNewMessagesCount}
                            getDialogs={getDialogs}
                        /> :
                        <EmptyChat/>
                    }
                </div>
            </Paper>
        </div>
    )
};

export default withMessagesStyles(Messages);
