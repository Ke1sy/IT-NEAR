import React, {FC} from 'react';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import {Route, Switch, withRouter, RouteComponentProps, NavLink} from "react-router-dom";
import {Link, makeStyles} from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import ProfileCover from './Cover/ProfileCover';
import StaticProfileInfo from "./ProfileInfo/StaticProfileInfo";
import ProfileLayout from "./ProfileLayout";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void
    setProfileInfo: (info: UpdatedProfileType) => void,
    currentUserInfo: ProfileType | null
}

const Profile: FC<PropsType & RouteComponentProps> = ({currentUserInfo, profile, status, setUserStatus, isOwner, loadPhoto, setProfileInfo}) => {
    return (
        <>
            <ProfileLayout
                profile={profile}
                status={status}
                isOwner={isOwner}
                setUserStatus={setUserStatus}
                loadPhoto={loadPhoto}
            >

                <Switch>
                    {isOwner &&
                    <Route exact path={`/settings`}>
                        {currentUserInfo &&
                        <ProfileSettings setProfileInfo={setProfileInfo} profile={currentUserInfo} loadPhoto={loadPhoto}/>
                        }
                    </Route>
                    }
                    <Route exact path="/profile/:id?">
                        {profile &&
                        <StaticProfileInfo
                            profile={profile}
                            setUserStatus={setUserStatus}
                            isOwner={isOwner}
                        />
                            //     {/*<PostsContainer authorId={profile.userId} isOwner={isOwner}/>*/}

                        }
                    </Route>
                </Switch>
            </ProfileLayout>
        </>
    )
};

export default withRouter(Profile);

