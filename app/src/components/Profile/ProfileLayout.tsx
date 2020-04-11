import React, {FC} from 'react';
import {ProfileType} from "../../redux/reducers/types";
import {Grid, Hidden, makeStyles} from "@material-ui/core";
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

const useStyles = makeStyles(theme => ({
    profile: {
        display: 'flex',
        [theme.breakpoints.down(769)]: {
           flexDirection: 'column'
        }
    },
    profileLeft: {
        width: '100%',
        minWidth: 250,
        [theme.breakpoints.up(769)]: {
            width: 250,
            minWidth: 250,
        },
        [theme.breakpoints.up('lg')]: {
            width: 300,
            minWidth: 300,
        },
    },
    profileRight: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        [theme.breakpoints.up(769)]: {
            paddingTop: 0,
            marginLeft: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(3),
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(3),
        }
    },
    grid: {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse'
        }
    }
}));

const ProfileLayout: FC<PropsType> = ({profile, status, setUserStatus, isOwner, children, loadPhoto}) => {
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
                        loadPhoto={loadPhoto}
                    />
                    }
                </div>
                <div className={classes.profileRight}>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item sm={12} lg={9}>
                            {children}
                        </Grid>
                        <Hidden mdDown>
                            <Grid item sm={10} lg={3}>
                                <ProfileActions isOwner={isOwner}/>
                            </Grid>
                        </Hidden>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default ProfileLayout;