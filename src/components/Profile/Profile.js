import React from 'react';
import classes from './profile.module.scss';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({profile, status, setUserStatus}) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo profile={profile} status={status} setUserStatus={setUserStatus}/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;
