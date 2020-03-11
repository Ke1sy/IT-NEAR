import React, {useState, FC} from 'react';
import classes from './profile-info.module.scss';
import StaticProfileInfo from "./StaticProfileInfo";
import withSuspense from "../../HOC/Suspense";
import {ProfileType, UpdatedProfileType} from "../../../redux/reducers/types";

const ProfileSettings = React.lazy(() => import(/* webpackChunkName: "ProfileSettings" */"./Settings/ProfileSettings"));

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void
    setProfileInfo: (info: UpdatedProfileType, userId: number) => void
}

const ProfileInfo: FC<PropsType> = ({profile, status, setUserStatus, isOwner, setProfileInfo, loadPhoto}) => {
    const [editMode, setEditMode] = useState(false);

    const changeEditMode = (val: boolean) => {
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
                    profile !== null ? <StaticProfileInfo profile={profile} status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>: ''
                }
            </div>
        </>
    )
};

export default ProfileInfo;
