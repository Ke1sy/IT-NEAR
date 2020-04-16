import React, {useEffect, FC} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus, getIsUserFollowed,
    loadPhoto, updateProfileInfo,
    setUserProfile,
    setUserStatus,
} from "../../redux/reducers/profile-reducer";
import {useParams, withRouter, useHistory} from "react-router-dom";
import {compose} from "redux";
import {
    getProfile,
    getProfileError,
    getStatus,
    getProfileIsLoading,
    getIsFollowed
} from "../../redux/reducers/profile-selectors";
import {getCurrentUserInfo, getCurrentUserId, getIsAuth} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, UpdatedProfileType} from "../../redux/reducers/types";
import ProfileError from './ProfileError/ProfileError';
import {withAuthRedirect} from "../Redirects/AuthRedirect";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    userId?: number | null | undefined
    isAuth: boolean,
    isFollowed: boolean,
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
    updateProfileInfo: (info: ProfileType, userId: number) => void,
    getIsUserFollowed: (id: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: FC<PropsType> = ({
                                             isAuth,
                                             userId,
                                             getUserProfile,
                                             getUserStatus,
                                             profile,
                                             status,
                                             setUserStatus,
                                             loadPhoto,
                                             updateProfileInfo,
                                             profileError,
                                             profileIsLoading,
                                             currentUserInfo,
                                             isFollowed,
                                             getIsUserFollowed
                                         }) => {
    let {id} = useParams();
    let history = useHistory();
    const isOwner = !id || Number(id) === userId;

    useEffect(() => {
        let newId = id;
        const checkProfile = () => {
            if (!id) {
                isAuth ? newId = String(userId) : history.push('/login');
            }

            getUserProfile(Number(newId));
            getUserStatus(Number(newId));
            if(!isOwner) {
                getIsUserFollowed(Number(newId));
            }
        };

        checkProfile();
    }, [id, isAuth, getUserProfile, userId, getUserStatus, history]);

    const updateInfo = (info: UpdatedProfileType) => {
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
            updateProfileInfo(updatedProfile, userId)
        }
    };

    if (profileError) {
        return (
            <ProfileError profileError={profileError}/>
        )
    }

    return (
        <Profile
            profile={profile}
            status={status}
            setUserStatus={setUserStatus}
            isOwner={isOwner}
            loadPhoto={loadPhoto}
            updateInfo={updateInfo}
            currentUserInfo={currentUserInfo}
            profileIsLoading={profileIsLoading}
            followed={isFollowed}
        />
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
        currentUserInfo: getCurrentUserInfo(state),
        isFollowed: getIsFollowed(state),
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        setUserStatus,
        setUserProfile,
        loadPhoto,
        updateProfileInfo,
        getIsUserFollowed
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer) as FC;


