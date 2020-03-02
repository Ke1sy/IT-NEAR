import React, {Component} from 'react';
import {
    follow,
    unfollow,
    requestUsers,
    setCurrentPage,
} from "../../redux/reducers/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/reducers/users-selectors";


class UsersContainer extends Component {
    componentDidMount() {
        const {currentPage, pageSize, requestUsers} = this.props;
        requestUsers(currentPage, pageSize);
    }

    onSetCurrentPage = (page) => {
        const {pageSize, setCurrentPage} = this.props;
        setCurrentPage(page, pageSize);
    };

    render() {
        const {users, pageSize, totalUsersCount, currentPage, isLoading, followInProgress, follow, unfollow} = this.props;

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
        followInProgress: getFollowInProgress(state)
    }
};


export default connect(mapStateToProps, {
    unfollow,
    requestUsers,
    setCurrentPage,
    follow
})(UsersContainer);
