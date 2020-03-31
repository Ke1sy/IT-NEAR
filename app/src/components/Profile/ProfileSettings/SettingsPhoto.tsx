import React, {useEffect, useState, FC, FormEvent, ChangeEvent} from 'react';
import styles from './settings-photo.module.scss';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {ProfileType} from "../../../redux/reducers/types";

type PropsType = {
    profile: ProfileType
    loadPhoto: (photo: any) => void
}

const SettingsPhoto: FC<PropsType> = ({profile, loadPhoto}) => {
    const [photo, setPhoto] = useState<string | null>(null);

    useEffect(() => {
        setPhoto(profile.photos.large)
    }, [profile.photos.large]);

    const inputFile: any = React.createRef();

    const photoPreview = (e: ChangeEvent<HTMLInputElement>) => {
        const {target: {files}} = e;
        if(files) {
            let photo = URL.createObjectURL(files[0]);
            setPhoto(photo);
        }

    };

    const updateAvatar = (e: FormEvent<HTMLFormElement>) => {
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