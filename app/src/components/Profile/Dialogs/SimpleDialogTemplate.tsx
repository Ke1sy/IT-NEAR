import React, {FC} from 'react';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    makeStyles,
    DialogActions,
    DialogProps,
    Button,
} from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

type PropsType = {
    open: boolean,
    title: string,
    resetAction: () => void,
    submitAction: any,
    submitName?: string,
    submitDisabled?: boolean,
    rest?: any
}

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
    },
    title: {
        textAlign: 'center',
        padding: '16px 24px 8px'
    },
    buttons: {
        justifyContent: 'space-between',
        padding: '8px 24px 16px'
    },
    btn: {
        width: '48%'
    }
}));

const SimpleDialogTemplate: FC<DialogProps & PropsType> = ({open, title, children, submitAction, resetAction, submitName, submitDisabled, ...rest}) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={resetAction}
            fullWidth
            maxWidth="xs"
            {...rest}
            classes={{
                paper: classes.paper
            }}>
            <DialogTitle className={classes.title}>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions className={classes.buttons} disableSpacing>
                <Button
                    onClick={submitAction}
                    className={classes.btn}
                    color="primary"
                    variant="contained"
                    startIcon={<CheckCircleOutlineOutlinedIcon/>}
                    {...(submitDisabled ? {disabled:submitDisabled} : {})}
                >
                   {submitName ? submitName : 'Confirm'}
                </Button>
                <Button
                    onClick={resetAction}
                    className={classes.btn}
                    color="secondary"
                    variant="contained"
                    startIcon={<CancelOutlinedIcon/>}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SimpleDialogTemplate;