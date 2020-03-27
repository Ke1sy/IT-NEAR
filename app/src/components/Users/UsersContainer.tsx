import React, {Component} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
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
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import queryString from 'query-string';
import {UserType} from "../../redux/reducers/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    pageSize: number
    searchQuery: string | null
    isLoading: boolean
    followInProgress: Array<number>
    users: Array<UserType>
    totalUsersCount: number
    currentPage: number
}

type OwnPropsType = {
    location: any
    history: any
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, searchText: string) => void
    startChat: (userId: number, history: any) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}

type PropsType = MapStatePropsType & OwnPropsType & MapDispatchPropsType

class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        const {pageSize, requestUsers} = this.props;
        const {search = '', page = 1} = this.getQueryParams();
        requestUsers(Number(page), pageSize, String(search))
    }

    getQueryParams = () => {
        return queryString.parse(this.props.location.search);
    };

    stringifyParams: (page?: number, search?: string | null) => string = (page, search) => {
        return '?' + queryString.stringify({
            search: search || undefined,
            page: page || undefined
        });
    };

    onChangeSearchText = ({searchText}: { searchText: string | null}) => {
        this.props.history.replace(this.stringifyParams(undefined, searchText));
    };

    onResetSearch = () => {
        this.props.history.replace(this.stringifyParams(undefined, ''));
    };

    onSetCurrentPage = (e: React.ChangeEvent<unknown>, value: number) => {
        this.props.history.replace(this.stringifyParams(value, this.props.searchQuery));
    };

    render() {
        const {users, pageSize, totalUsersCount, currentPage, isLoading, followInProgress, follow, unfollow, startChat, history} = this.props;
        return (
                <Users
                    follow={follow}
                    unfollow={unfollow}
                    onSetCurrentPage={this.onSetCurrentPage}
                    users={users}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    currentPage={currentPage}
                    followInProgress={followInProgress}
                    startChat={startChat}
                    history={history}
                    onChangeSearchText={this.onChangeSearchText}
                    onResetSearch={this.onResetSearch}
                    isLoading={isLoading}
                />
        )
    }
}

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
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        unfollow,
        requestUsers,
        follow,
        startChat
    }),
    withRouter
)(UsersContainer) as React.ComponentType<any>;

