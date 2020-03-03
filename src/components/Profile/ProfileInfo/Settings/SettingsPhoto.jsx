import React, {useEffect, useState} from 'react';
import styles from './settings-photo.module.scss';
import userPlaceholder from "../../../../assets/images/user-placeholder.png";

const SettingsPhoto = ({profile, loadPhoto}) => {
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        setPhoto(profile.photos.large)
    }, [profile.photos.large]);

    const inputFile = React.createRef();

    const photoPreview = ({target: {files}}) => {
        let photo = URL.createObjectURL(files[0]);
        setPhoto(photo);
    };

    const updateAvatar = (e) => {
        e.preventDefault();
        const files = inputFile.current.files;
        if (files.length) {
            loadPhoto(files[0]);
            e.currentTarget.reset();
        }
    };

    return (
        <div className={styles.photo}>
            <div className={styles.photo__img}>
                <img
                    src={photo !== null ? photo : userPlaceholder}
                    alt=""
                />
            </div>
            <div className={styles.photo__load}>
                <form onSubmit={updateAvatar}>
                    <input type="file" name="photo" ref={inputFile} onChange={photoPreview}/>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
};

export default SettingsPhoto;
