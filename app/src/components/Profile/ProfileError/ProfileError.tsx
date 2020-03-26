import React, {FC} from 'react';
import profileMissed from "../../../assets/images/profileNotFound.jpg";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import { Badge } from '@material-ui/core';

type PropsType = {
    profileError: string | null
}

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: '30px 0',
        // textTransform: 'uppercase'
    },
    img: {
        maxWidth: 300
    },
    error: {
        textAlign: 'left',
    }
}));

const ProfileError: FC<PropsType> = ({profileError}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4">Profile Not Found</Typography>
            <div>
                <img
                    src={profileMissed}
                    alt="no-profile"
                    className={classes.img}
                />
            </div>
            <Alert severity="error" className={classes.error}>
                {profileError}
            </Alert>
        </div>
    )
};

export default ProfileError;
