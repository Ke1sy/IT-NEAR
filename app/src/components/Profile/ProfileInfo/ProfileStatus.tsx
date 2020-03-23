import React, {useEffect, useState, FC} from 'react';
import editIcon from "../../../assets/images/edit.svg";
import styles from "./profile-status.module.scss";

type PropsType = {
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = ({status, setUserStatus, isOwner}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    const changeEditingMode = (val: boolean) => {
        setIsEditing(val);

        if (!val) {
            setUserStatus(newStatus)
        }
    };

    useEffect(() => {
        setNewStatus(status)
    }, [status]);


    const handleChange = ({target: {value}}: { target: {value: string}}) => {
        setNewStatus(value)
    };

    return (
        <div>
            {!isEditing &&
            <p>
                <b>Status: </b>
                <span>{status}</span>
                {isOwner &&
                    <span onClick={() => changeEditingMode(true)} className={styles.edit}>
                        <img src={editIcon} alt=""/>
                    </span>
                }

            </p>
            }
            {isEditing &&
            <input
                type="text"
                autoFocus={true}
                value={newStatus}
                onChange={handleChange}
                onBlur={() => changeEditingMode(false)}/>
            }
        </div>
    )
};

export default ProfileStatus;

