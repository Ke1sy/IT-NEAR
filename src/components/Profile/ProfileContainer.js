import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    loadPhoto, setProfileInfo,
    setUserProfile,
    setUserStatus
} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/reducers/profile-selectors";
import {getCurrentUserId, getIsAuth} from "../../redux/reducers/auth-selectors";

const ProfileContainer = ({isAuth, userId, getUserProfile, getUserStatus, match, history, profile, status, setUserStatus, loadPhoto, setProfileInfo}) => {
    const isOwner = match.params.id === undefined || Number(match.params.id) === userId;

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

    const updateProfileInfo = (info) => {
        setProfileInfo(info, userId)
    };

    return (
        <Profile
            profile={profile}
            status={status}
            setUserStatus={setUserStatus}
            isOwner={isOwner}
            loadPhoto={loadPhoto}
            setProfileInfo={updateProfileInfo}
        />
    )
};

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        userId: getCurrentUserId(state),
        isAuth: getIsAuth(state),
    }
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, setUserStatus, setUserProfile, loadPhoto, setProfileInfo}),
    withRouter,
)(ProfileContainer);


