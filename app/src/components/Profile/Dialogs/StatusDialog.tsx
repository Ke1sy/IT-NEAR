import React, {useEffect, useState, FC} from 'react';
import {TextField} from "@material-ui/core";
import SimpleDialogTemplate from "../Dialogs/SimpleDialogTemplate";

type PropsType = {
    status: string,
    setUserStatus: (status: string) => void,
    open: boolean,
    handleClose: () => void,
}

const StatusDialog: FC<PropsType> = ({status, open, handleClose, setUserStatus}) => {
    const [newStatus, setNewStatus] = useState(status);
    const saveNewStatus = () => {
        setUserStatus(newStatus);
        handleClose();
    };

    useEffect(() => {
        setNewStatus(status)
    }, [status]);

    const handleChange = ({target: {value}}: { target: { value: string } }) => {
        setNewStatus(value)
    };

    return (
        <SimpleDialogTemplate
            open={open}
            resetAction={handleClose}
            submitAction={saveNewStatus}
            aria-labelledby="change-status-dialog"
            title="Change Status"
        >
            <TextField
                autoFocus
                margin="dense"
                label="Status"
                type="textarea"
                multiline
                rowsMax={8}
                value={newStatus}
                onChange={handleChange}
                fullWidth
            />
        </SimpleDialogTemplate>
    )
};

export default StatusDialog;

