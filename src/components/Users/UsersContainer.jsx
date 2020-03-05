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
import {follow, unfollow, requestUsers, setSearchText} from "../../redux/reducers/users-reducer";
import {startChat} from "../../redux/reducers/dialogs-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import queryString from 'query-string';

class UsersContainer extends Component {
    componentDidMount() {
        const {pageSize, requestUsers} = this.props;
        const {search = '', page = 1} = this.getQueryParams();
        requestUsers(page, pageSize, search)
    }

    getQueryParams = () => {
        return queryString.parse(this.props.location.search);
    };

    stringifyParams = (page, search) => {
        return '?' + queryString.stringify({
            search: search || undefined,
            page: page || undefined
        });
    };

    onChangeSearchText = ({searchText}) => {
        this.props.history.replace(this.stringifyParams('', searchText));
    };

    onSetCurrentPage = (page) => {
        this.props.history.replace(this.stringifyParams(page, this.props.searchQuery));
    };

    render() {
        const {users, pageSize, totalUsersCount, currentPage, isLoading, followInProgress, follow, unfollow, startChat, history} = this.props;
        return (
            <Preloader showPreloader={isLoading}>
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
                />
            </Preloader>
        )
    }
}

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {unfollow, requestUsers, follow, startChat, setSearchText}),
    withRouter
)(UsersContainer);


