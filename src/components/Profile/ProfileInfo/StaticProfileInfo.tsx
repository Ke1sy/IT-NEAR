import React, {FC, useEffect, useState} from 'react';
import classes from './profile-info.module.scss';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import jobImage from "../../../assets/images/job-image.png";
import ProfileStatus from "./ProfileStatus";
import {ProfileType} from "../../../redux/reducers/types";

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
}
type ContactsArrType = {
    name: string
    url: string
}

const StaticProfileInfo: FC<PropsType> = ({profile, status, setUserStatus, isOwner}) => {
    const [contactsArr, setContactsArr] = useState<Array<ContactsArrType>>([]);

    useEffect(() => {
        let newArr: ContactsArrType[] = [];
        Object.entries(profile.contacts).forEach(([key, value]) => {
                if (value !== null && value.length) {
                    newArr  = [...newArr, {name: key, url: value}];
                }
            }
        );
        setContactsArr(newArr);
    }, [profile.contacts]);

    return (
        <>
            <div className={classes.profile__left}>
                <div className={classes.profile__avatar}>
                    <img
                        src={profile.photos.small !== null ? profile.photos.small : userPlaceholder}
                        alt=""
                        className={classes.profile__img}/>
                </div>

                <div className={classes.profile__contacts}>
                    {
                        contactsArr.map((item: any) =>
                            <a href={item.url} key={item.name} className={classes.profile__link} target="_blank"
                               rel="noopener noreferrer">
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
                    <ProfileStatus status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>
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
        </>
    )
};

export default StaticProfileInfo;