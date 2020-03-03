import React from 'react';
import styles from './message.module.scss';

const Message = ({message: {addedAt, body, id, recipientId, senderId, senderName, translatedBody, viewed}}) => {
    return (
        <div className={styles.message}>{body}</div>
    )
};


export default Message;
