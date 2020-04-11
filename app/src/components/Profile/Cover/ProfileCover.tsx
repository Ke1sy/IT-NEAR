import React, {FC} from 'react';
import withProfileCoverStyles from './coverStyles'
import {WithStyles} from '@material-ui/core';
import profileCover from '../../../assets/images/profile_cover.jpg'

const ProfileCover: FC<WithStyles> = ({classes}) => {
    return (
        <div className={classes.cover} style={{backgroundImage: `url(${profileCover})`}}/>
    )
};

export default withProfileCoverStyles(ProfileCover);
