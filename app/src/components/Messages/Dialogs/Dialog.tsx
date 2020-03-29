import React, {FC} from 'react';
import styles from './dialog.module.scss';
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {DialogsType} from "../../../redux/reducers/types";
import {Avatar, Button, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

type PropsType = {
    user: DialogsType
}

const Dialog: FC<PropsType> = ({user: {id, userName, photos, hasNewMessages, lastDialogActivityDate}}) => {
    const newMessagesCount = 100;
    const lastMessageDate = new Date(lastDialogActivityDate).toLocaleDateString();

    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;

    return (
        <ListItem button={true} component={NavLink}  to={`/dialogs/${id}`} activeClassName={styles.active}>
            <ListItemAvatar>
                <Avatar src={userAvatar} alt={userName} sizes="40"/>
            </ListItemAvatar>
            <ListItemText primary={userName} secondary={lastMessageDate} />
            {/*<span className={styles.newMessages}>  1 </span>*/}
            {hasNewMessages && <span className={styles.newMessages}> {newMessagesCount > 99 ? '99+' : newMessagesCount}</span>}
        </ListItem>
    )
};


export default Dialog;
