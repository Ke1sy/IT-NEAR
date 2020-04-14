import React, {FC} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import {Grid, Hidden, WithStyles} from "@material-ui/core";
import ProfileCover from './../Cover/ProfileCover';
import Sidebar from "../Sidebar/Sidebar";
import ProfileActions from "../Sidebar/ProfileActions";
import withProfileLayoutStyles from "./profileLayoutStyles";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void,
    profileIsLoading: boolean,
    followed: boolean
}

const ProfileLayout: FC<PropsType & WithStyles> = ({profile, status, setUserStatus, isOwner, children, loadPhoto, profileIsLoading, followed, classes}) => {
    return (
        <div>
            <ProfileCover/>
            <div className={classes.profile}>
                <div className={classes.profileLeft}>
                    {profile &&
                    <Sidebar
                        profile={profile}
                        status={status}
                        setUserStatus={setUserStatus}
                        isOwner={isOwner}
                        loadPhoto={loadPhoto}
                        profileIsLoading={profileIsLoading}
                        followed={followed}
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
                                {profile &&
                                <ProfileActions
                                    userId={profile.userId}
                                    isOwner={isOwner}
                                    profileIsLoading={profileIsLoading}
                                    followed={followed}
                                />
                                }
                            </Grid>
                        </Hidden>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default withProfileLayoutStyles(ProfileLayout);