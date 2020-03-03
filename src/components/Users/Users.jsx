import React from 'react';
import styles from './users.module.scss';
import User from "./User/User";
import Pagination from "./Pagination/Pagination";

const Users = ({users, pageSize, totalUsersCount, currentPage, follow, unfollow, onSetCurrentPage, followInProgress, startChat, history}) => {
    const totalPages = Math.ceil(totalUsersCount / pageSize);
    const userItems = users.map(user =>
        <User
            key={user.id}
            user={user}
            follow={follow}
            unfollow={unfollow}
            followInProgress={followInProgress}
            startChat={startChat}
            history={history}
        />
    );

    return (
        <div className={styles.users}>
            <h3>Users</h3>
            {userItems}
            <Pagination totalPages={totalPages} currentPage={currentPage} onSetCurrentPage={onSetCurrentPage}/>
        </div>
    )
};

export default Users;