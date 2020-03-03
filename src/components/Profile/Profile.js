import React from 'react';
import classes from './profile.module.scss';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../Preloader/Preloader";

const Profile = ({profile, status, setUserStatus, isOwner, loadPhoto}) => {
    if (!profile) {
        return <Preloader showPreloader={true} />
    }
    return (
        <div className={classes.profile}>
            <ProfileInfo profile={profile} status={status} setUserStatus={setUserStatus} isOwner={isOwner} loadPhoto={loadPhoto}/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;
