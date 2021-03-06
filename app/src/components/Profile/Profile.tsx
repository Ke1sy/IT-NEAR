import React, {FC} from 'react';
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import {Route, Switch, withRouter, RouteComponentProps} from "react-router-dom";
import ProfileLayout from "./Layout/ProfileLayout";
import SettingsReduxForm from "./ProfileSettings/SettingsForm";
import ProfileInfoTabs from "./Tabs/ProfileInfoTabs";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    setUserStatus: (status: string) => void
    loadPhoto: (photo: any) => void
    updateInfo: (info: UpdatedProfileType) => void,
    currentUserInfo: ProfileType | null,
    profileIsLoading: boolean,
    followed: boolean
}

const Profile: FC<PropsType & RouteComponentProps> = ({currentUserInfo, profile, status, setUserStatus, isOwner, loadPhoto, updateInfo, profileIsLoading, followed}) => {
    return (
        <ProfileLayout
            profile={profile}
            status={status}
            isOwner={isOwner}
            setUserStatus={setUserStatus}
            loadPhoto={loadPhoto}
            profileIsLoading={profileIsLoading}
            followed={followed}
        >
            <Switch>
                {isOwner &&
                <Route exact path={`/settings`}>
                    {currentUserInfo &&
                    <SettingsReduxForm profile={currentUserInfo} onSubmit={updateInfo}/>
                    }
                </Route>
                }
                <Route path="/profile/:id?">
                    {profile &&
                    <ProfileInfoTabs
                        profile={profile}
                        isOwner={isOwner}
                        currentUserInfo={currentUserInfo}
                        profileIsLoading={profileIsLoading}
                    />
                    }
                </Route>
            </Switch>
        </ProfileLayout>
    )
};

export default withRouter(Profile);

