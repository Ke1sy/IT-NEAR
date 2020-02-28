import React from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";

const Messages = (props) => {
    const {messages, dialogs, addMessage} = props;

    const onAddMessage = ({message}) => {
        if (message.length > 0) {
            addMessage(message);
        }
    };

    let messagesElems = messages.map(({id, message}) => (<Message key={id} message={message}/>));
    let dialogsElems = dialogs.map(({id, name}) => (<Dialog key={id} name={name} id={id}/>));

    return (
        <div className={styles.content}>
            <div className={styles.dialogs}>
                {dialogsElems}
            </div>
            <div className={styles.messages}>
                <div className={styles.messages__wrapper}>
                    {messagesElems}
                </div>
                <MessageForm onSubmit={onAddMessage}/>
            </div>
        </div>
    )
};

export default Messages;
