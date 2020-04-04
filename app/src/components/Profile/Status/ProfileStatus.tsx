import React, {useState, FC} from 'react';
import {makeStyles, Tooltip, Typography} from "@material-ui/core";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import StatusDialog from "../Dialogs/StatusDialog";

type PropsType = {
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
}

const useStyles = makeStyles(theme => ({
    statusTxt: {
        textAlign: 'center'
    },
    icon: {
        cursor: 'pointer',
        marginLeft: 5,
        opacity: 0.7,
        transform: 'translateY(4px)',

        '&:hover': {
            opacity: 1
        }
    },
    tooltip: {
        backgroundColor: theme.palette.primary.light,
    },

}));


const ProfileStatus: FC<PropsType> = ({status, setUserStatus, isOwner}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={classes.statusTxt}>
                <Typography variant="body1" component="span">{status}</Typography>
                {isOwner &&
                <Tooltip title="Change status" aria-label="Change" color="primary" classes={{tooltip: classes.tooltip}}>
                    <CreateOutlinedIcon color="primary" className={classes.icon} fontSize="small"
                                        onClick={handleClickOpen}/>
                </Tooltip>
                }
            </div>
            <StatusDialog open={open} handleClose={handleClose} status={status} setUserStatus={setUserStatus}/>
        </>
    )
};

export default ProfileStatus;

