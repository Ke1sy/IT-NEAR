import React from 'react';
import classes from './profile-info.module.scss';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import jobImage from "../../../assets/images/job-image.png";
import Preloader from "../../Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({profile, status, setUserStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    let contactsArr = [];
    const contacts = profile.contacts;

    for (let key in contacts) {
        if (contacts[key] !== null) {
            contactsArr.push({
                name: key,
                url: contacts[key]
            })
        }
    }

    return (
        <>
            <div className={classes.image}/>

            <div className={classes.profile}>
                <div className={classes.profile__left}>
                    <img
                        src={profile.photos.small !== null ? profile.photos.small : userPlaceholder}
                        alt=""
                        className={classes.profile__img}/>


                    <div className={classes.profile__contacts}>
                        {
                            contactsArr.map(item =>
                                <a href={item.url} key={item.name} className={classes.profile__link} target="_blank">
                                    {item.name}
                                </a>
                            )
                        }
                    </div>
                </div>
                <div className={classes.profile__right}>
                    <div className={classes.profile__column}>
                        <p><b>Name: </b>{profile.fullName}</p>
                        <p><b>About me: </b>{profile.aboutMe}</p>
                        <ProfileStatus status={status} setUserStatus={setUserStatus}/>
                    </div>
                    {profile.lookingForAJob &&
                    <div className={classes.profile__job}>
                        <img
                            src={jobImage}
                            alt=""
                            className={classes.profile__img}/>
                        <p><b>Job Description: </b>{profile.lookingForAJobDescription}</p>
                    </div>

                    }
                </div>
            </div>
        </>
    )
};

export default ProfileInfo;
