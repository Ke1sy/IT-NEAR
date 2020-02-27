import React from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import Message from "./Message/Message";

const Messages = (props) => {
    const {messages, dialogs, newMessageText, addMessage, updateNewMessageText} = props;

    const onMessageChange = ({target: {value}}) => {
        updateNewMessageText(value);
    };

    const onAddMessage = () => {
        if (newMessageText.length > 0) {
            addMessage();
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
                <div className={styles.messages__form}>
                    <textarea onChange={onMessageChange} value={newMessageText}/>
                    <button onClick={onAddMessage}>Send</button>
                </div>
            </div>
        </div>
    )
};

export default Messages;
