import React, {FC} from 'react';
import profileMissed from "../../../assets/images/profileNotFound.jpg";
import Typography from '@material-ui/core/Typography';
import {WithStyles} from "@material-ui/core";
import {Alert} from '@material-ui/lab';
import withProfileErrorStyles from "./profileErrorStyles";

type PropsType = {
    profileError: string | null
}

const ProfileError: FC<PropsType & WithStyles> = ({profileError, classes}) => {
    return (
        <div className={classes.root}>
            <Typography variant="h4">Profile Not Found</Typography>
            <img
                src={profileMissed}
                alt="no-profile"
                className={classes.img}
            />
            <Alert severity="error" className={classes.error}>
                {profileError}
            </Alert>
        </div>
    )
};

export default withProfileErrorStyles(ProfileError);
