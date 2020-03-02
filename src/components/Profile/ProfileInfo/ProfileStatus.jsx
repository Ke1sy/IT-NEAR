import React, {useEffect, useState} from 'react';

const ProfileStatus = ({status, setUserStatus}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    const changeEditingMode = (val) => {
        setIsEditing(val);

        if (!val) {
            setUserStatus(newStatus)
        }
    };

    useEffect(() => {
        setNewStatus(status)
    }, [status]);


    const handleChange = ({target: {value}}) => {
        setNewStatus(value)
    };

    return (
        <div className="status">
            {!isEditing &&
            <p onDoubleClick={() => changeEditingMode(true)}>
                <b>Status: </b>
                <span>{newStatus}</span>
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

