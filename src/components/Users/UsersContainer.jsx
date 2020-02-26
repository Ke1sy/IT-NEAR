import React, {Component} from 'react';
import {
    follow,
    unfollow,
    getUsers,
    setCurrentPage,
} from "../../redux/reducers/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";


class UsersContainer extends Component {
    componentDidMount() {
        const {currentPage, pageSize, getUsers} = this.props;
        getUsers(currentPage, pageSize);
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

let mapStateToProps = ({usersReducer: {users, pageSize, totalUsersCount, currentPage, isLoading, followInProgress}}) => {
    return {
        users,
        pageSize,
        totalUsersCount,
        currentPage,
        isLoading,
        followInProgress
    }
};


export default connect(mapStateToProps, {
    unfollow,
    getUsers,
    setCurrentPage,
    follow
})(UsersContainer);
