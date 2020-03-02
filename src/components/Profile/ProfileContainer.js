import React, {Component, useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, setUserProfile, setUserStatus} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const ProfileContainer = (props) => {
    const {isAuth, userId, getUserProfile, getUserStatus} = props;
    let id = props.match.params.id;

    useEffect(() => {
        checkProfile();
    }, [id]);

    const checkProfile = () => {
        if (!id || id === 'undefined') {
            isAuth ? getUserProfile(userId) : props.history.push('/login');
        }
        getUserProfile(id);
        getUserStatus(id);
    };

    return (
        <Profile {...props} />
    )
};

const mapStateToProps = ({profileReducer: {profile, status}, authReducer: {isAuth, userId}}) => {
    return {
        profile,
        status,
        userId,
        isAuth}
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, setUserStatus, setUserProfile}),
    withRouter,
)(ProfileContainer);


