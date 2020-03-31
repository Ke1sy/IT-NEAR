import React, {useEffect, useState, FC} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button, makeStyles, Theme
} from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import InputIcon from "@material-ui/icons/Input";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import withWidth from "@material-ui/core/withWidth";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
type PropsType = {
    status: string,
    setUserStatus: (status: string) => void,
    open: boolean,
    handleClose: () => void,
    width: Breakpoint
}


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.up('sm')]: {
            minWidth: 320
        },
    },
    title: {
        textAlign: 'center'
    },
    buttons: {
        justifyContent: 'space-between',
        padding: '8px 24px 16px'
    },
    btn: {
       width: '48%'
    }
}));

const StatusDialog: FC<PropsType> = ({status, open, handleClose, setUserStatus}) => {
    const [newStatus, setNewStatus] = useState(status);
    const classes = useStyles();
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                classes={{
                    paper: classes.paper
                }}>
            <DialogTitle className={classes.title}>Change Status</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions className={classes.buttons} disableSpacing>
                <Button onClick={saveNewStatus} className={classes.btn} color="primary" variant="contained" startIcon={<CheckCircleOutlineOutlinedIcon/>}>
                    Save
                </Button>
                <Button onClick={handleClose} className={classes.btn} color="secondary" variant="contained" startIcon={<CancelOutlinedIcon/>}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default withWidth()(StatusDialog);

