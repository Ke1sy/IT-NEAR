import React from 'react';
import styles from './user.module.scss';
import userPlaceholder from '../../../assets/images/user-placeholder.png';
import {NavLink} from "react-router-dom";

const User = ({unfollow, follow, user, followInProgress}) => {
    return (
        <div className={styles.user}>
            <div className={styles.user__left}>
                <NavLink to={`/profile/${user.id}`}>
                    <img
                        src={user.photos.small !== null ? user.photos.small : userPlaceholder}
                        alt=""
                        className={styles.user__avatar}/>
                </NavLink>

                <button
                    disabled={followInProgress.includes(user.id)}
                    onClick={user.followed ?
                        () => unfollow(user.id) :
                        () => follow(user.id)}>
                    {user.followed ? "Unfollow" : "Follow"}
                </button>
            </div>
            <div className={styles.user__right}>
                <div>
                    <p>{user.name}</p>
                    <p>{user.status}</p>
                </div>
            </div>
        </div>
    )
};

export default User;
