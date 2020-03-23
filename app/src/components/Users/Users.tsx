import React, {FC} from 'react';
import styles from './users.module.scss';
import User from "./User/User";
import Pagination from "./Pagination/Pagination";
import SearchContainer from "./Search/SearchContainer";
import {UserType} from "../../redux/reducers/types";

type PropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followInProgress: Array<number>,
    history: any,

    follow: (id: number) => void,
    unfollow: (id: number) => void,
    onSetCurrentPage: ({selected}: {selected: number}) => void,
    startChat: (userId: number, history: any) => void,
    onChangeSearchText: ({searchText}: {searchText: string}) => void
}

const Users: FC<PropsType> = ({users, pageSize, totalUsersCount, currentPage, follow, unfollow, onSetCurrentPage, followInProgress, startChat, history, onChangeSearchText}) => {
    const totalPages = Math.ceil(totalUsersCount / pageSize);
    const userItems = users.map((user: UserType) =>
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
            <SearchContainer onChangeSearchText={onChangeSearchText}/>
            {userItems}
            <Pagination totalPages={totalPages} currentPage={Number(currentPage)} onSetCurrentPage={onSetCurrentPage}/>
        </div>
    )
};

export default Users;