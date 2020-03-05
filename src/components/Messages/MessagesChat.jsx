import React, {createRef, useEffect} from 'react';
import styles from './messages.module.scss';
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";

const MessagesChat = ({
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
    useEffect(() => {
        if (friendId) {
            updateMessages();
        }
    }, [friendId]);

    const updateMessages = () => {
        if (friendId !== undefined) {
            getMessages(friendId)
                .then(() => scrollChatToBottom());
        }
    };

    const scrollChatToBottom = () => {
        const wrapper = document.getElementById("wrapper");
        wrapper.scroll(0, wrapper.scrollHeight - wrapper.clientHeight);
    };

    const onAddMessage = ({message}) => {
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
                            friendId={friendId}
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
