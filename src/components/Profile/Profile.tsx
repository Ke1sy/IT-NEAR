import React, {FC} from 'react';
import classes from './profile.module.scss';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../Preloader/Preloader";
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void
    setProfileInfo: (info: UpdatedProfileType) => void
}

const Profile: FC<PropsType> = ({profile, status, setUserStatus, isOwner, loadPhoto, setProfileInfo}) => {
    if (!profile) {
        return <Preloader showPreloader={true}/>
    }
    return (
        <div className={classes.profile}>
            <ProfileInfo
                profile={profile}
                status={status}
                setUserStatus={setUserStatus}
                isOwner={isOwner}
                loadPhoto={loadPhoto}
                setProfileInfo={setProfileInfo}
            />
            {isOwner &&
            <PostsContainer/>
            }
        </div>
    )
};

export default Profile;
