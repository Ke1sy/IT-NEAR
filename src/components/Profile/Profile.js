import React from 'react';
import classes from './profile.module.scss';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({profile}) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo profile={profile}/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;
