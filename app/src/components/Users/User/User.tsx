import React, {FC} from 'react';
import styles from './user.module.scss';
import userPlaceholder from '../../../assets/images/user-placeholder.png';
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/reducers/types";

type PropsType = {
    user: UserType,
    followInProgress: Array<number>,
    history: any,

    follow: (id: number) => void,
    unfollow: (id: number) => void,
    startChat: (userId: number, history: any) => void,
};

const User: FC<PropsType> = ({unfollow, follow, user, followInProgress, startChat, history}) => {
    const {id, photos, name, status, followed} = user;
    return (
        <div className={styles.user}>
            <div className={styles.user__left}>
                <NavLink to={`/profile/${id}`}>
                    <img
                        src={photos.small !== null ? photos.small : userPlaceholder}
                        alt=""
                        className={styles.user__avatar}/>
                </NavLink>

                <button
                    disabled={followInProgress.includes(id)}
                    onClick={followed ?
                        () => unfollow(id) :
                        () => follow(id)}>
                    {followed ? "Unfollow" : "Follow"}
                </button>
                <button
                    disabled={followInProgress.includes(id)}
                    onClick={() => startChat(id, history)}>
                    Send Message
                </button>
            </div>
            <div className={styles.user__right}>
                <div>
                    <p>{name}</p>
                    <p>{status}</p>
                </div>
            </div>
        </div>
    )
};

export default User;