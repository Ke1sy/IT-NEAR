import React, {FC} from 'react';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import {makeStyles} from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import ProfileCover from './Cover/ProfileCover';

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void
}

const useStyles = makeStyles((theme) => ({
    profile: {
        display: 'flex',
    },
    profileLeft: {
        width: 300
    },
    profileRight: {
        flexGrow: 1,
        marginLeft: theme.spacing(2)
    }
}));

const ProfileLayout: FC<PropsType> = ({profile, status, setUserStatus, isOwner, children}) => {
    const classes = useStyles();
    return (
        <div>
            <ProfileCover/>
            <div className={classes.profile}>
                <div className={classes.profileLeft}>
                    {profile !== null &&
                    <Sidebar
                        profile={profile}
                        status={status}
                        setUserStatus={setUserStatus}
                        isOwner={isOwner}
                    />
                    }
                </div>
                <div className={classes.profileRight}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ProfileLayout;