import React from 'react';
import {Divider, makeStyles} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
    divider: {
        height: 4,
        backgroundColor: theme.palette.primary.main,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    }
}));

const StyledDivider = ({customClasses}: {customClasses?: any}) => {
    const classes = useStyles();
    return (
        <Divider className={classNames(classes.divider, customClasses)}/>
    );
};

export default StyledDivider;
