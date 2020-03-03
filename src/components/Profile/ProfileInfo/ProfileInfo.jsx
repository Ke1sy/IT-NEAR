import React, {useState} from 'react';
import classes from './profile-info.module.scss';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import jobImage from "../../../assets/images/job-image.png";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({profile, status, setUserStatus, isOwner, loadPhoto}) => {
    const [photo, setPhoto] = useState(profile.photos.small);

    let contactsArr = [];
    const contacts = profile.contacts;
    const inputFile = React.createRef();

    for (let key in contacts) {
        if (contacts[key] !== null) {
            contactsArr.push({
                name: key,
                url: contacts[key]
            })
        }
    }

    const photoPreview = ({target: {files}}) => {
        let photo =  URL.createObjectURL(files[0]);
        setPhoto(photo);
    };

    const updateAvatar = (e) => {
        e.preventDefault();
        const files = inputFile.current.files;
        if(files.length) {
            loadPhoto(files[0]);
        }
    };

    return (
        <>
            <div className={classes.image}/>

            <div className={classes.profile}>
                <div className={classes.profile__left}>
                    <div className={classes.profile__avatar}>
                        <img
                            src={photo !== null ? photo : userPlaceholder}
                            alt=""
                            className={classes.profile__img}/>
                    </div>

                    {isOwner &&
                        <div className={classes.profile__load}>
                            <form onSubmit={updateAvatar}>
                                <input type="file" name="photo" ref={inputFile} onChange={photoPreview}/>
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    }



                    <div className={classes.profile__contacts}>
                        {
                            contactsArr.map(item =>
                                <a href={item.url} key={item.name} className={classes.profile__link} target="_blank" rel="noopener noreferrer">
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
