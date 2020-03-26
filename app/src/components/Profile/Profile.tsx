import React, {FC} from 'react';
import classes from './profile.module.scss';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import {Route, Switch, withRouter, RouteComponentProps} from "react-router-dom";
import {Grid, makeStyles} from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import ProfileCover from './Cover/ProfileCover';

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void
    setProfileInfo: (info: UpdatedProfileType) => void,
    ownerId:  number | null | undefined,
    currentUserInfo: ProfileType | null
}

const useStyles = makeStyles((theme) => ({
    profile: {
        paddingTop: 30,
        display: 'flex'
    },
    profileLeft: {
        width: 250
    },
    profileRight: {
        flexGrow: 1,
        marginLeft: theme.spacing(2)
    }
}));

const Profile: FC<PropsType & RouteComponentProps> = ({currentUserInfo,profile, status, setUserStatus, isOwner, loadPhoto, setProfileInfo, ownerId}) => {
   const classes = useStyles();
    return (
        <div>
            <Switch>
                {isOwner &&
                <Route exact path={`/profile/${ownerId}/edit`}>
                    <h1> Edit page</h1>
                </Route>
                }

                {profile &&
                <Route exact path={`/profile/${profile.userId}/posts`}>
                    <PostsContainer authorId={profile.userId} isOwner={isOwner}/>
                </Route>
                }
                <Route exact path="/profile/:id?">
                    <ProfileCover/>

                    <div className={classes.profile}>
                        <div className={classes.profileLeft}>
                            {profile !== null &&
                            <Sidebar profile={profile} status={status}/>
                            }
                        </div>
                        <div className={classes.profileRight}>
                        <ProfileInfo
                                profile={profile}
                                status={status}
                                setUserStatus={setUserStatus}
                                isOwner={isOwner}
                                loadPhoto={loadPhoto}
                                setProfileInfo={setProfileInfo}
                            />
                        </div>
                    </div>
                </Route>
            </Switch>
            {/*{profile &&*/}
            {/*     <PostsContainer authorId={profile.userId} isOwner={isOwner}/>*/}
            {/*}*/}
        </div>
    )
};

export default withRouter(Profile);
