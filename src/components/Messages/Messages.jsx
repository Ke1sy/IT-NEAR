import React, {useEffect} from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import MessagesChat from "./MessagesChat";

const Messages = ({
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
