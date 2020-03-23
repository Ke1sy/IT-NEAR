import React, {useEffect, FC} from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import MessagesChat from "./MessagesChat";
import {DialogsType, MessagesType} from "../../redux/reducers/types";

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
    let friendId = match.params.id;

    useEffect(() => {
        getDialogs()
    }, []);

    let dialogsElems = dialogs.map(user =>
        <Dialog
            key={user.id}
            user={user}
        />
    );

    return (
        <>
            <div className={styles.content}>
                <div className={styles.dialogs}>
                    {dialogsElems}
                </div>
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

            </div>
        </>

    )
};

export default Messages;
