import React, {useEffect, FC} from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import MessagesChat from "./MessagesChat";
import {DialogsType, MessagesType, ProfileType} from "../../redux/reducers/types";
import {Paper, List, makeStyles, Theme} from "@material-ui/core";
import EmptyChat from "./EmptyChat";

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
    sendMessage: (userId: number, message: string) => void
    getMessages: (userId: number) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            flexGrow: 1,
            padding: '60px 0',
            display: 'flex',
            alignItems: 'center'
        },
        paper: {
            width: '100%',
            height:'75vh',
            display: 'flex',
            background: '#ffffff',
            borderRadius: 0,
        },
        list: {
            width: '27%',
            borderRight: '1px solid #eeeeee',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            maxHeight: '100%',
            padding: 0
        },
        content: {
            width: '73%',
            position: 'relative',
        }
    }),
);

const Messages: FC<PropsType> = ({
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
                                     messagesLoading
                                 }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <List className={classes.list} component="div">
                    {dialogs.map(user =>
                        <Dialog
                            key={user.id}
                            user={user}
                        />
                    )
                    }
                </List>
                <div className={classes.content}>
                    {currentUserInfo && friendId ? <MessagesChat
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
                    /> : <EmptyChat/>}
                </div>
            </Paper>
        </div>
    )
};

export default Messages;
