import React, {FC} from 'react';
import User from "./User/User";
import Pagination from "./Pagination/Pagination";
import SearchContainer from "./Search/SearchContainer";
import {UserType} from "../../redux/reducers/types";
import {Grid, Typography} from "@material-ui/core";
import Preloader from "../Preloader/Preloader";

type PropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followInProgress: Array<number>,
    history: any,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    onSetCurrentPage: (event: React.ChangeEvent<unknown>, page: number) => void
    startChat: (userId: number, history: any) => void,
    onChangeSearchText: ({searchText}: { searchText: string }) => void,
    onResetSearch: () => void,
    isLoading: boolean
}

const Users: FC<PropsType> = ({
                                  users,
                                  pageSize,
                                  totalUsersCount,
                                  currentPage,
                                  follow,
                                  onResetSearch,
                                  unfollow,
                                  onSetCurrentPage,
                                  followInProgress,
                                  startChat,
                                  history,
                                  onChangeSearchText,
                                  isLoading
                              }) => {
    const totalPages = Math.ceil(totalUsersCount / pageSize);

    return (
        <div>
            <Typography gutterBottom variant="h3" style={{paddingTop: 30, textAlign: 'center'}}>
                Users
            </Typography>
            <div style={{position: 'relative'}}>
                <Preloader showPreloader={isLoading}/>
                <SearchContainer onChangeSearchText={onChangeSearchText} onResetSearch={onResetSearch}/>
                <Grid container spacing={3}>
                    {users.map((user: UserType) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                            <User
                                user={user}
                                follow={follow}
                                unfollow={unfollow}
                                followInProgress={followInProgress}
                                startChat={startChat}
                                history={history}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>
            <Pagination totalPages={totalPages} currentPage={Number(currentPage)} onSetCurrentPage={onSetCurrentPage}/>
        </div>
    )
};

export default Users;