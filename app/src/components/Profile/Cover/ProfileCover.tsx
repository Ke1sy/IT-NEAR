import React, {FC} from 'react';
import withProfileCoverStyles from './coverStyles'
import {WithStyles} from '@material-ui/core';

const ProfileCover: FC<WithStyles> = ({classes}) => {

    return (
        <div className={classes.cover}>
            <img src="https://www.hiig.de/wp-content/uploads/bb-plugin/cache/system-2660914_1920-panorama.jpg" alt=""/>
        </div>
    )
};

export default withProfileCoverStyles(ProfileCover);
