import {makeStyles} from "@material-ui/core";
import {EmailRoundedIcon} from "../Icons/MeterialIcons";
import React from "react";

const useStyles = makeStyles(theme => ({
    wrap: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 400
    },
    icon: {
        marginRight: 10
    }
}));

const NewMessageNoty = ({message}: { message: string }) => {
    const classes = useStyles();
    return (
        <div className={classes.wrap}>
            <EmailRoundedIcon fontSize="small" className={classes.icon}/>
            <span>
                {message}
            </span>
        </div>
    )
};

export default NewMessageNoty;
