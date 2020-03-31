import React, {FC, useState} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import withSidebarStyles from './sidebarStyles'
import {WithStyles, Paper, Avatar, Typography} from '@material-ui/core';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import ProfileStatus from "../Status/ProfileStatus";

type PropsType = {
    status: string,
    profile: ProfileType,
    setUserStatus: (status: string) => void
    isOwner: boolean
}

const Sidebar: FC<PropsType & WithStyles> = ({profile: {photos, fullName}, status, classes, setUserStatus, isOwner}) => {
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;

    return (
        <Paper className={classes.paper}>
            <div className={classes.body}>
                <div className={classes.avatar}>
                    <Avatar src={userAvatar} alt={fullName ? fullName : 'avatar'} className={classes.avatarImg}/>
                </div>
                <Typography variant="h6">{fullName}</Typography>
               <ProfileStatus status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>
            </div>
        </Paper>
    )
};

export default withSidebarStyles(Sidebar);
