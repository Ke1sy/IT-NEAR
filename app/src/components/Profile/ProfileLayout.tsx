import React, {FC} from 'react';
import {ProfileType} from "../../redux/reducers/types";
import {Grid, makeStyles} from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import ProfileCover from './Cover/ProfileCover';
import ProfileActions from "./Sidebar/ProfileActions";

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
        width: 300,
        minWidth: 300
    },
    profileRight: {
        flexGrow: 1,
        marginLeft: theme.spacing(3),
        paddingTop: 30
    },
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
                    <Grid container spacing={3}>
                        <Grid item sm={8} md={9}>
                            {children}
                        </Grid>
                        <Grid item sm={4} md={3}>
                            <ProfileActions
                                isOwner={isOwner}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default ProfileLayout;