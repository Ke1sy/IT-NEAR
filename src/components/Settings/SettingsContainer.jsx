import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Settings from "./Settings";
import {getUserProfile, setProfileInfo} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../Redirects/AuthRedirect";

const SettingsContainer = (props) => {
    const {userId, getUserProfile, profile, setProfileInfo} = props;

    const updateProfileInfo = (info) => {
        setProfileInfo(info, userId)
    };

    useEffect(() => {
        getUserProfile(userId);
    }, [userId]);

    return (
        <Settings profile={profile} setProfileInfo={updateProfileInfo} />
    )
};


const mapStateToProps = ({profileReducer: {profile}, authReducer: {userId}}) => {
    return {
        profile,
        userId
    }
};

export default compose(
    connect(mapStateToProps, {setProfileInfo, getUserProfile}),
    withAuthRedirect
)(SettingsContainer);

