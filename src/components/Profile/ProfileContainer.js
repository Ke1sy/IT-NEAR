import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, setUserProfile, setUserStatus} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const ProfileContainer = ({isAuth, userId, getUserProfile, getUserStatus, match, history, profile, status, setUserStatus}) => {
    useEffect(() => {
        let id = match.params.id;

        const checkProfile = () => {
            if (!id || id === 'undefined') {
                isAuth ? id = userId : history.push('/login');
            }
            getUserProfile(id);
            getUserStatus(id);
        };

        checkProfile();
    }, [match.params.id, isAuth, getUserProfile, userId, getUserStatus, history]);


    return (
        <Profile profile={profile} status={status} setUserStatus={setUserStatus}/>
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


