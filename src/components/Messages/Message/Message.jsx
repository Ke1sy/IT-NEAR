import React, {useState} from 'react';
import styles from './message.module.scss';
import classNames from 'classnames';
import deleteIcon from "../../../assets/images/trash.svg";
import spamIcon from "../../../assets/images/spam.svg";
import restoreIcon from "../../../assets/images/restore.svg";
import readIcon from "../../../assets/images/read.svg";
import unreadIcon from "../../../assets/images/unread.svg";


const Message = ({message, userId, deleteMessage, spamMessage, friendId, restoreMessage, deletedMessages, spamedMessages}) => {
    const {addedAt, body, id, recipientId, senderId, senderName, translatedBody, viewed} = message;
    const messageDeleted = deletedMessages.includes(id);
    const messageSpamed = spamedMessages.includes(id);
    const messageInactive = messageDeleted || messageSpamed;


    const date = new Date(addedAt).toLocaleTimeString();
    const inactiveText = messageDeleted ?  'Message was deleted' : 'Message added to spam';

    return (
            <div className={classNames(
                styles.message,
                senderId === userId ? styles.messageSended : styles.messageRecieved,
                messageInactive ? styles.messageInactive : ''
            )}>
                <div className={styles.messageItem}>
                    {messageInactive ?  inactiveText : body }
                </div>
                <img src={viewed ? readIcon : unreadIcon} alt="" className={styles.viewedIcon}/>

                <div className={styles.date}>
                    {date}
                </div>
                {!messageInactive &&
                <>
                    <button className={styles.delete} title="Delete" onClick={() => deleteMessage(id)}>
                        <img src={deleteIcon} alt="" className={styles.messageIcon}/>
                    </button>
                    {senderId !== userId &&
                    <button className={styles.spam} title="Spam" onClick={() => spamMessage(id)}>
                        <img src={spamIcon} alt="" className={styles.messageIcon}/>
                    </button>
                    }

                </>
                }

                {messageInactive ? <RestoreBtn callback={() => restoreMessage(id)}/> : ''}

            </div>
    )
};

const RestoreBtn = ({callback}) => {
    return (
        <button className={styles.restore} title="Restore" onClick={callback}>
            <img src={restoreIcon} alt="" className={styles.messageIcon}/>
        </button>
    )
};

export default Message;
