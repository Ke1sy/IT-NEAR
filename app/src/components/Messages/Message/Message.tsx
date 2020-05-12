import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import RM from "../../../RouterManager";
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import {Avatar, Tooltip, Typography, WithStyles} from "@material-ui/core";
import {DeleteOutlineOutlined, RestoreOutlined, ErrorOutlineOutlined} from '@material-ui/icons';
import readIcon from "../../../assets/images/read.svg";
import unreadIcon from "../../../assets/images/unread.svg";
import {MessagesType, ProfileType} from "../../../redux/reducers/types";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import withMessageStyles from './messageStyles'

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

const Message: FC<PropsType & WithStyles> = ({message, deleteMessage, spamMessage, restoreMessage, deletedMessages, spamedMessages, selectedFriend, currentUserInfo, classes}) => {
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
            classes.message,
            isOwnerMessage ? classes.messageSended : classes.messageRecieved,
            messageInactive ? classes.messageInactive : ''
        )}>
            <Avatar component={NavLink} to={RM.profile.getPath(senderId)} src={getAvatar()} alt='avatar' sizes="40" className={classes.avatar}/>
            <Typography variant="body2" className={classes.messageItem} component="div">
                {messageInactive ? inactiveText : <Markdown>{body}</Markdown>}
            </Typography>

            {isOwnerMessage &&
            <img src={viewed ? readIcon : unreadIcon} alt="" className={classes.viewedIcon}/>
            }

            <div className={classes.date}>
                {date}
            </div>
            {!messageInactive &&
            <>
                <button className={classNames(classes.actionBtn, classes.delete)} onClick={() => deleteMessage(id)}>
                    <Tooltip title="Delete" aria-label="Delete">
                        <DeleteOutlineOutlined color="primary" className={classes.messageIcon}/>
                    </Tooltip>
                </button>
                {!isOwnerMessage &&
                <button className={classNames(classes.actionBtn, classes.spam)} onClick={() => spamMessage(id)}>
                    <Tooltip title="Spam" aria-label="Spam">
                        <ErrorOutlineOutlined color="primary" className={classes.messageIcon}/>
                    </Tooltip>
                </button>
                }
            </>
            }
            {messageInactive &&
            <button className={classNames(classes.actionBtn, classes.restore)} onClick={() => restoreMessage(id)}>
                <Tooltip title="Restore" aria-label="Restore">
                    <RestoreOutlined color="primary" className={classes.messageIcon}/>
                </Tooltip>
            </button>
            }
        </div>
    )
};

export default withMessageStyles(Message);
