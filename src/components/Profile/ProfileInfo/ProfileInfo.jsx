import React, {useState} from 'react';
import classes from './profile-info.module.scss';
import StaticProfileInfo from "./StaticProfileInfo";
import withSuspense from "../../HOC/Suspense";

const ProfileSettings = React.lazy(() => import(/* webpackChunkName: "ProfileSettings" */"./Settings/ProfileSettings"));

const ProfileInfo = ({profile, status, setUserStatus, isOwner, setProfileInfo, loadPhoto}) => {
    const [editMode, setEditMode] = useState(false);

    const changeEditMode = (val) => {
        setEditMode(val)
    };

    const EditableProfile = withSuspense(ProfileSettings);

    return (
        <>
            <div className={classes.image}/>
            <div className={classes.profile}>
                {isOwner && editMode  &&
                    <span className={classes.profile__edit} onClick={() => changeEditMode(false)}>
                        Назад
                    </span>
                }
                {isOwner && !editMode  &&
                    <span className={classes.profile__edit} onClick={() => changeEditMode(true)}>
                    Редактировать профиль
                    </span>
                }

                {editMode ?
                    <EditableProfile setProfileInfo={setProfileInfo} profile={profile} loadPhoto={loadPhoto}/> :
                    <StaticProfileInfo profile={profile} status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>
                }
            </div>
        </>
    )
};

export default ProfileInfo;
