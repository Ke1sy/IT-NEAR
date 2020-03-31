import React, {FC} from 'react';
import styles from "./profile-settings.module.scss";
import SettingsPhoto from "./SettingsPhoto";
import SettingsReduxForm from "./SettingsForm";
import {Link} from "@material-ui/core";
import {NavLink, Route} from "react-router-dom";
import {UpdatedProfileType, ProfileType} from "../../../redux/reducers/types";

type PropsType = {
    profile: ProfileType,
    loadPhoto: (photo: any) => void
    setProfileInfo: (info: UpdatedProfileType) => void
}

const ProfileSettings: FC<PropsType> = ({setProfileInfo, profile, loadPhoto}) => {
    return (
        <div className={styles.settings}>
            <Link component={NavLink} to={`/profile/${profile.userId}`}>
                Profile
            </Link>
            <div className={styles.settings__title}>
                Profile Photo:
            </div>
            <SettingsPhoto profile={profile} loadPhoto={loadPhoto}/>
            <div className={styles.settings__title}>
                Profile Info:
            </div>
            <SettingsReduxForm profile={profile} onSubmit={setProfileInfo}/>
        </div>
    )
};

export default ProfileSettings;
