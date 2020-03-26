import React, {useEffect, FC} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    loadPhoto, setProfileInfo,
    setUserProfile,
    setUserStatus,
} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getProfile, getProfileError, getStatus, getProfileIsLoading} from "../../redux/reducers/profile-selectors";
import {getCurrentUserInfo, getCurrentUserId, getIsAuth} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";
import {PhotosType, ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import ProfileError from './ProfileError/ProfileError';
import Preloader from "../Preloader/Preloader";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    userId?: number | null | undefined
    isAuth: boolean,
    profileError: string | null,
    profileIsLoading: boolean,
    currentUserInfo: ProfileType | null
}

type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getUserStatus: (id: number) => void
    setUserStatus: (status: string) => void
    setUserProfile: (profile: ProfileType) => void,
    loadPhoto: (photo: any) => void,
    setProfileInfo: (info: ProfileType, userId: number) => void
}

type RouteProps = {
    match: any,
    history: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteProps

const ProfileContainer: FC<PropsType> = ({
                                             isAuth,
                                             userId,
                                             getUserProfile,
                                             getUserStatus,
                                             match,
                                             history,
                                             profile,
                                             status,
                                             setUserStatus,
                                             loadPhoto,
                                             setProfileInfo,
                                             profileError,
                                             profileIsLoading,
                                             currentUserInfo
                                         }) => {
    const isOwner = match.params.id === undefined || Number(match.params.id) === userId;
    useEffect(() => {
        let id = match.params.id;

        const checkProfile = () => {
            if (!id || id === 'undefined') {
                isAuth ? id = userId : history.push('/login');
            }
            getUserProfile(id);
            getUserStatus(id);
        };

        checkProfile();
    }, [match.params.id, isAuth, getUserProfile, userId, getUserStatus, history]);

    const updateProfileInfo = (info: UpdatedProfileType) => {
        const {aboutMe, lookingForAJob, lookingForAJobDescription, fullName, ...contacts} = info;

        if (userId && profile) {
            let updatedProfile = {
                ...profile,
                aboutMe,
                lookingForAJob,
                lookingForAJobDescription,
                fullName,
                contacts: {
                    ...profile.contacts,
                    ...contacts
                }
            };
            setProfileInfo(updatedProfile, userId)
        }
    };

    if (profileIsLoading) {
        return <Preloader showPreloader={true}/>
    }

    if (profileError) {
        return (
            <ProfileError profileError={profileError}/>
        )
    }

    return (
        <Profile profile={profile} status={status} setUserStatus={setUserStatus} isOwner={isOwner} loadPhoto={loadPhoto}
                 setProfileInfo={updateProfileInfo} ownerId={userId} currentUserInfo={currentUserInfo}/>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        userId: getCurrentUserId(state),
        isAuth: getIsAuth(state),
        profileError: getProfileError(state),
        profileIsLoading: getProfileIsLoading(state),
        currentUserInfo: getCurrentUserInfo(state)
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, RouteProps, AppStateType>(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        setUserStatus,
        setUserProfile,
        loadPhoto,
        setProfileInfo
    }),
    withRouter,
)(ProfileContainer) as React.ComponentType<any>;


