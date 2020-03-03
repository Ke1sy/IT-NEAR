import React, {Component} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {getCurrentPage, getFollowInProgress, getIsLoading, getPageSize, getTotalUsersCount, getUsers} from "../../redux/reducers/users-selectors";
import {follow, unfollow, requestUsers, setCurrentPage} from "../../redux/reducers/users-reducer";
import {startChat} from "../../redux/reducers/dialogs-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

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


export default compose(
    connect(mapStateToProps, {unfollow, requestUsers, setCurrentPage, follow, startChat}),
    withRouter
)(UsersContainer);


