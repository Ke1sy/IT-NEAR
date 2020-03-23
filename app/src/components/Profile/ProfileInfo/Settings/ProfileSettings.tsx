import React, {FC} from 'react';
import styles from "./profile-settings.module.scss";
import SettingsPhoto from "./SettingsPhoto";
import SettingsReduxForm from "./SettingsForm";
import {ProfileType, UpdatedProfileType} from "../../../../redux/reducers/types";

type PropsType = {
    profile: ProfileType,
    loadPhoto: (photo: any) => void
    setProfileInfo: (info: UpdatedProfileType) => void
}

const ProfileSettings: FC<PropsType> = ({setProfileInfo, profile, loadPhoto}) => {
    return (
        <div className={styles.settings}>
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
