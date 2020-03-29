import React, {useEffect, FC} from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import MessagesChat from "./MessagesChat";
import {DialogsType, MessagesType} from "../../redux/reducers/types";
import {Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles, Theme} from "@material-ui/core";

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    userId: number | null
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>
}

type MapDispatchPropsType = {
    sendMessage: (userId: number, message: string) => void
    getDialogs: () => void
    getMessages: (userId: number) => Promise<void>
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

type RoutePropsType = {
    match: any
}
const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            width: '27%',
            borderRight: '1px solid #eeeeee',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            maxHeight: '100%',
        },
    }),
);

type PropsType = MapStatePropsType & MapDispatchPropsType & RoutePropsType;

const Messages: FC<PropsType> = ({
                                     match,
                                     messages,
                                     deletedMessages,
                                     dialogs,
                                     sendMessage,
                                     getDialogs,
                                     getMessages,
                                     userId,
                                     deleteMessage,
                                     spamMessage,
                                     lastUserActivityDate,
                                     restoreMessage,
                                     spamedMessages
                                 }) => {
    const classes = useStyles();
    let friendId = match.params.id;

    useEffect(() => {
        getDialogs()
    }, []);

    return (
        <Paper className={styles.content}>
            <List className={classes.root} component="div">
                {dialogs.map(user =>
                    <Dialog
                        key={user.id}
                        user={user}
                    />
                )
                }
            </List>
                {friendId && <MessagesChat
                    deletedMessages={deletedMessages}
                    spamedMessages={spamedMessages}
                    messages={messages}
                    friendId={friendId}
                    sendMessage={sendMessage}
                    getMessages={getMessages}
                    userId={userId}
                    deleteMessage={deleteMessage}
                    spamMessage={spamMessage}
                    lastUserActivityDate={lastUserActivityDate}
                    restoreMessage={restoreMessage}
                />}
        </Paper>
    )
};

export default Messages;
