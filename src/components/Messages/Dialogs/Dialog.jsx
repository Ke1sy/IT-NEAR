import React from 'react';
import styles from './dialog.module.scss';
import {NavLink} from "react-router-dom";

const Dialog = ({id, name}) => {
    return (
        <div className={styles.dialog}>
            <NavLink
                to={`/dialogs/${id}`}
                className={styles.dialog__link}
                activeClassName={styles.active}>
                {name}
            </NavLink>
        </div>
    )
};


export default Dialog;
