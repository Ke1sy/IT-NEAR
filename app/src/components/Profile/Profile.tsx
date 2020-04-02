import React, {FC} from 'react';
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import {Route, Switch, withRouter, RouteComponentProps, NavLink} from "react-router-dom";
import StaticProfileInfo from "./ProfileInfo/StaticProfileInfo";
import ProfileLayout from "./ProfileLayout";
// import ProfileSettings from "./ProfileSettings/ProfileSettings";
import SettingsReduxForm from "./ProfileSettings/SettingsForm";
import ProfileInfoTabs from "./Tabs/ProfileInfoTabs";

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
                        <SettingsReduxForm profile={currentUserInfo} onSubmit={setProfileInfo}/>
                        }
                    </Route>
                    }
                    <Route path="/profile/:id?">
                        {profile &&
                        <ProfileInfoTabs
                            profile={profile}
                            isOwner={isOwner}
                        />
                        }
                    </Route>
                </Switch>
            </ProfileLayout>
        </>
    )
};

export default withRouter(Profile);

