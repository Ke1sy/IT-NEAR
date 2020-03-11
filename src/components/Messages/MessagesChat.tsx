import React, {useEffect, FC} from 'react';
import styles from './messages.module.scss';
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";
import {MessagesType} from "../../redux/reducers/types";

type PropsType = {
    messages: Array<MessagesType>
    userId: number | null
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>
    friendId: number
    sendMessage: (userId: number, message: string) => void
    getMessages: (userId: number) => Promise<void>
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

const MessagesChat: FC<PropsType> = ({
                                         friendId,
                                         messages,
                                         userId,
                                         deleteMessage,
                                         spamMessage,
                                         lastUserActivityDate,
                                         restoreMessage,
                                         getMessages,
                                         sendMessage,
                                         deletedMessages,
                                         spamedMessages
                                     }) => {

    const updateMessages = () => {
        if (friendId !== undefined) {
            getMessages(friendId)
                .then(() => scrollChatToBottom());
        }
    };

    useEffect(() => {
        if (friendId) {
            updateMessages();
        }
    }, [friendId]);


    const scrollChatToBottom = () => {
        const wrapper = document.getElementById("wrapper");
        if (wrapper) {
            wrapper.scroll(0, wrapper.scrollHeight - wrapper.clientHeight);
        }
    };

    const onAddMessage = ({message}: { message: string }) => {
        sendMessage(friendId, message);
    };

    return (
        <>
            <div className={styles.messages}>
                {lastUserActivityDate &&
                <div className={styles.messages__lastDate}>Was
                    here: {new Date(lastUserActivityDate).toLocaleString()}</div>
                }
                <div className={styles.messages__wrapper} id="wrapper">
                    {messages.map(message =>
                        <Message
                            key={message.id}
                            message={message}
                            userId={userId}
                            deleteMessage={deleteMessage}
                            spamMessage={spamMessage}
                            restoreMessage={restoreMessage}
                            deletedMessages={deletedMessages}
                            spamedMessages={spamedMessages}
                        />
                    )}
                </div>
                <MessageForm onSubmit={onAddMessage}/>
            </div>
        </>

    )
};

export default MessagesChat;
