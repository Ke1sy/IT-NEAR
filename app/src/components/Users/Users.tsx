import React, {FC} from 'react';
import User from "./User/User";
import Pagination from "./Pagination/Pagination";
import {UserType} from "../../redux/reducers/types";
import {Grid, Typography} from "@material-ui/core";
import Search from "./Search/Search";

type PropsType = {
    users: Array<UserType>,
    currentPage: number,
    onSetCurrentPage: (event: React.ChangeEvent<unknown>, page: number) => void
    onChangeSearchText: ({searchText}: { searchText: string }) => void,
    onResetSearch: () => void,
    isLoading: boolean,
    searchRequest: string | null,
    totalPages: number
}

const Users: FC<PropsType> = ({
                                  users,
                                  currentPage,
                                  onResetSearch,
                                  onSetCurrentPage,
                                  onChangeSearchText,
                                  isLoading,
                                  searchRequest,
                                  totalPages
                              }) => {

    return (
        <div>
            <Typography gutterBottom variant="h3" style={{paddingTop: 30, textAlign: 'center'}}>
                Users
            </Typography>
            <Search onChangeSearchText={onChangeSearchText} searchRequest={searchRequest} onResetSearch={onResetSearch} isLoading={isLoading}/>
            <Grid container spacing={3}>
                {users.map((user: UserType) =>
                    <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                        <User
                            user={user}
                            isLoading={isLoading}
                        />
                    </Grid>
                )}
            </Grid>
            {users.length > 0 &&
            <Pagination totalPages={totalPages} currentPage={Number(currentPage)} onSetCurrentPage={onSetCurrentPage}/>
            }
        </div>
    )
};

export default Users;