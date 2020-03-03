import React, {useEffect, useState} from 'react';
import styles from './messages.module.scss';
import Dialog from "./Dialogs/Dialog";
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";

const Messages = ({match, messages, dialogs, sendMessage, getDialogs, getMessages}) => {
    const [activeDialog, setActiveDialog] = useState(null);
    let id = match.params.id;

    useEffect(() => {
        getDialogs();
    }, []);

    useEffect(() => {
        // setActiveDialog(id);
        getMessages(id);
    }, [match.params.id]);

    const onAddMessage = ({message}) => {
        sendMessage(id, message);
    };

    let messagesElems = messages.map(message => <Message key={message.id} message={message}/>);
    let dialogsElems = dialogs.map(({id, userName}) => (
        <Dialog key={id} name={userName} id={id}/>
    ));

    return (
        <>
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
        </>

    )
};

export default Messages;
