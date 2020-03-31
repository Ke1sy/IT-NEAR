import React, {FC} from 'react';
import withProfileCoverStyles from './coverStyles'
import {WithStyles} from '@material-ui/core';
import profileCover from '../../../assets/images/profile_cover.jpg'
const ProfileCover: FC<WithStyles> = ({classes}) => {

    return (
        <div className={classes.cover}>
            <img src={profileCover} alt=""/>
        </div>
    )
};

export default withProfileCoverStyles(ProfileCover);
