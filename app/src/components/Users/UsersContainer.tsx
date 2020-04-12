import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsLoading,
    getPageSize,
    getSearchQuery,
    getTotalUsersCount,
    getUsers
} from "../../redux/reducers/users-selectors";
import {follow, unfollow, requestUsers} from "../../redux/reducers/users-reducer";
import {startChat} from "../../redux/reducers/dialogs-reducer";
import {withRouter, useLocation, useHistory} from "react-router-dom";
import {compose} from "redux";
import queryString from 'query-string';
import {UserType} from "../../redux/reducers/types";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from '../Redirects/AuthRedirect';

type MapStatePropsType = {
    pageSize: number
    searchQuery: string | null
    isLoading: boolean
    followInProgress: Array<number>
    users: Array<UserType>
    totalUsersCount: number
    currentPage: number
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, searchText: string) => void
    startChat: (userId: number, history: any) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersContainer: FC<PropsType> = ({
                                           pageSize,
                                           searchQuery,
                                           isLoading,
                                           followInProgress,
                                           users,
                                           totalUsersCount,
                                           currentPage,
                                           requestUsers,
                                           startChat, follow,
                                           unfollow
                                       }) => {

    const [searchRequest, setSearchRequest] = useState<any>(null);
    const totalPages = Math.ceil(totalUsersCount / pageSize);
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        const {search = '', page = 1} = getQueryParams();
        requestUsers(Number(page), pageSize, String(search));
    }, []);

    useEffect(() => {
        const request = queryString.parse(location.search);
        setSearchRequest(request.search ? request.search : null)
    }, [location]);

    const getQueryParams = () => {
        return queryString.parse(location.search);
    };

    const stringifyParams: (page?: number, search?: string | null) => string = (page, search) => {
        return '?' + queryString.stringify({
            search: search || undefined,
            page: page || undefined
        });
    };

    const onChangeSearchText = ({searchText}: { searchText: string | null }) => {
        history.replace(stringifyParams(undefined, searchText));
    };

    const onResetSearch = () => {
        history.replace(stringifyParams(undefined, ''));
    };

    const onSetCurrentPage = (e: React.ChangeEvent<unknown>, value: number) => {
        history.replace(stringifyParams(value, searchQuery));
    };

    return (
        <Users
            follow={follow}
            unfollow={unfollow}
            onSetCurrentPage={onSetCurrentPage}
            users={users}
            currentPage={currentPage}
            followInProgress={followInProgress}
            startChat={startChat}
            history={history}
            onChangeSearchText={onChangeSearchText}
            onResetSearch={onResetSearch}
            isLoading={isLoading}
            searchRequest={searchRequest}
            totalPages={totalPages}
        />
    )
};

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followInProgress: getFollowInProgress(state),
        searchQuery: getSearchQuery(state),
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        unfollow,
        requestUsers,
        follow,
        startChat
    }),
    withRouter,
    withAuthRedirect,
)(UsersContainer) as FC;

