import React, {FC} from 'react';
import Markdown from 'markdown-to-jsx';
import styles from './message.module.scss';
import classNames from 'classnames';
import readIcon from "../../../assets/images/read.svg";
import unreadIcon from "../../../assets/images/unread.svg";
import {MessagesType, ProfileType} from "../../../redux/reducers/types";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {Avatar, Tooltip, Typography} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

type PropsType = {
    message: MessagesType
    deletedMessages: Array<string>
    spamedMessages: Array<string>
    selectedFriend: ProfileType | null
    currentUserInfo: ProfileType,

    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

const Message: FC<PropsType> = ({message, deleteMessage, spamMessage, restoreMessage, deletedMessages, spamedMessages, selectedFriend, currentUserInfo}) => {
    const {addedAt, body, id, senderId, viewed} = message;
    const messageDeleted = deletedMessages.includes(id);
    const messageSpamed = spamedMessages.includes(id);
    const messageInactive = messageDeleted || messageSpamed;
    const isOwnerMessage = senderId === currentUserInfo.userId;

    const getAvatar = () => {
        if (!isOwnerMessage && selectedFriend) {
            return selectedFriend.photos.small || userPlaceholder;
        } else if (isOwnerMessage) {
            return currentUserInfo.photos.small || userPlaceholder;
        } else {
            return userPlaceholder
        }
    };

    const getDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleTimeString();
        return formattedDate.split(":").slice(0,-1).join(':');
    };

    const date = getDate(addedAt);
    const inactiveText = messageDeleted ? 'Message was deleted' : 'Message added to spam';

    return (
        <div className={classNames(
            styles.message,
            isOwnerMessage ? styles.messageSended : styles.messageRecieved,
            messageInactive ? styles.messageInactive : ''
        )}>
            <Avatar src={getAvatar()} alt='avatar' sizes="40" className={styles.avatar}/>
            <Typography variant="body2" className={styles.messageItem} component="div">
                {messageInactive ? inactiveText : <Markdown>{body}</Markdown>}
            </Typography>
            <img src={viewed ? readIcon : unreadIcon} alt="" className={styles.viewedIcon}/>

            <div className={styles.date}>
                {date}
            </div>
            {!messageInactive &&
            <>
                <button className={styles.delete} onClick={() => deleteMessage(id)}>
                    <Tooltip title="Delete" aria-label="Delete">
                        <DeleteOutlineOutlinedIcon color="primary" className={styles.messageIcon}/>
                    </Tooltip>
                </button>
                {!isOwnerMessage &&
                <button className={styles.spam} onClick={() => spamMessage(id)}>
                    <Tooltip title="Spam" aria-label="Spam">
                        <ErrorOutlineOutlinedIcon color="primary" className={styles.messageIcon}/>
                    </Tooltip>
                </button>
                }
            </>
            }
            {messageInactive &&
            <button className={styles.restore} onClick={() => restoreMessage(id)}>
                <Tooltip title="Restore" aria-label="Restore">
                    <RestoreOutlinedIcon color="primary" className={styles.messageIcon}/>
                </Tooltip>
            </button>
            }
        </div>
    )
};

export default Message;
