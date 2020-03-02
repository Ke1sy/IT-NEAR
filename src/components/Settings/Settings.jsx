import React from 'react';
import styles from './settings.module.scss';
import SettingsReduxForm from "./SettingsForm";

const Settings = ({setProfileInfo, profile}) => {
    return (
        <div className={styles.settings}>
            <h1>Profile Settings</h1>
            <SettingsReduxForm profile={profile} onSubmit={setProfileInfo}/>
        </div>
    )
};

export default Settings;
