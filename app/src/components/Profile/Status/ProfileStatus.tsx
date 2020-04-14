import React, {useState, FC} from 'react';
import {Tooltip, Typography, WithStyles} from "@material-ui/core";
import StatusDialog from "../Dialogs/StatusDialog";
import withProfileStatusStyles from "./profileStatusStyles";
import {CreateOutlinedIcon} from "../../Icons/MeterialIcons";

type PropsType = {
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType & WithStyles> = ({status, setUserStatus, isOwner, classes}) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = (open: boolean) => {
        setOpen(open);
    };

    return (
        <>
            <div className={classes.statusTxt}>
                <Typography variant="body1" component="span" color="textSecondary">{status}</Typography>
                {isOwner &&
                <Tooltip title="Change status" aria-label="Change" color="primary" classes={{tooltip: classes.tooltip}}>
                    <CreateOutlinedIcon color="primary" className={classes.icon} fontSize="small"
                                        onClick={() => toggleOpen(true)}/>
                </Tooltip>
                }
            </div>
            <StatusDialog open={open} handleClose={() => toggleOpen(false)} status={status} setUserStatus={setUserStatus}/>
        </>
    )
};

export default withProfileStatusStyles(ProfileStatus);

