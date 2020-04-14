import React, {FC} from 'react';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    DialogProps,
    Button, WithStyles,
} from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import withSimpleDialogStyles from "./simpleDialogStyles";

type PropsType = {
    open: boolean,
    title: string,
    resetAction: () => void,
    submitAction: any,
    submitName?: string,
    submitDisabled?: boolean,
    rest?: any
}

const SimpleDialogTemplate: FC<DialogProps & PropsType & WithStyles> = ({open, title, children, submitAction, resetAction, submitName, submitDisabled, classes, ...rest}) => {
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

export default withSimpleDialogStyles(SimpleDialogTemplate);