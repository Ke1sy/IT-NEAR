import React from 'react';
import styles from './dialog.module.scss';
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../../assets/images/user-placeholder.png";

const Dialog = ({user: {id, userName, photos, hasNewMessages, newMessagesCount}}) => {
    return (
        <div className={styles.dialog}>
            <NavLink
                to={`/dialogs/${id}`}
                className={styles.dialog__link}
                activeClassName={styles.active}>
                <span><img src={photos.small ? photos.small : userPlaceholder} alt="" className={styles.dialog__photo}/></span>
                <span>{userName}
                    {hasNewMessages && <span> ({newMessagesCount})</span>}
                </span>
            </NavLink>
        </div>
    )
};


export default Dialog;
