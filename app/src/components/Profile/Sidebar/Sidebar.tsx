import React, {FC} from 'react';
import {PhotosType, ProfileType} from "../../../redux/reducers/types";
import withSidebarStyles from './sidebarStyles'
import {WithStyles, Paper, Avatar, Typography} from '@material-ui/core';
import userPlaceholder from "../../../assets/images/user-placeholder.png";

type PropsType = {
    status: string,
    profile: ProfileType
}

const Sidebar: FC<PropsType & WithStyles> = ({profile: {photos, fullName}, status, classes}) => {
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;

    return (
        <Paper className={classes.paper}>
            <div className={classes.head}/>
            <div className={classes.body}>
                <div className={classes.avatar}>
                    <Avatar src={userAvatar} alt={fullName ? fullName : 'avatar'} className={classes.avatarImg}/>
                </div>
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="body2">{status}</Typography>
            </div>
        </Paper>
    )
};

export default withSidebarStyles(Sidebar);
