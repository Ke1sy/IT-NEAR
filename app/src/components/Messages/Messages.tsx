import React, {FC} from 'react';
import Dialog from "./Dialogs/Dialog";
import MessagesChat from "./Chat/MessagesChat";
import {DialogsType, MessagesType, ProfileType} from "../../redux/reducers/types";
import {Paper, List, makeStyles, Theme} from "@material-ui/core";
import EmptyChat from "./Chat/EmptyChat";
import classNames from "classnames";

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
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                padding: '20px 0',
            }
        },
        paper: {
            width: '100%',
            height: 'calc(100vh - 100px)',
            display: 'flex',
            background: '#ffffff',
            borderRadius: 0,
            position: 'relative'
        },
        list: {
            borderRight: '1px solid #eeeeee',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            maxHeight: '100%',
            padding: 0,
            [theme.breakpoints.down(769)]: {
                background: 'rgba(255, 255, 255, 0.8)',
                position: 'absolute',
                left: 0,
                width: '100%',
                top: 0,
                bottom: 0,
                zIndex: 2
            },
            [theme.breakpoints.up(769)]: {
                width: 250,
                minWidth: 250,
            },
            [theme.breakpoints.up('md')]: {
                width: 300,
                minWidth: 300,
            },
        },
        hiddenList: {
            [theme.breakpoints.down(769)]: {
                left: 'calc(-100% - 30px)',
            },
        },
        content: {
            flexGrow: 1,
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
                        /> :
                        <EmptyChat/>
                    }
                </div>
            </Paper>
        </div>
    )
};

export default Messages;
