import React, {FC, useEffect, useState} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {compose} from "redux";
import {withRouter, RouteComponentProps, useHistory} from "react-router-dom";
import {
    getCurrentUserInfo,
    getCurrentUserId,
    getCurrentUserLogin,
    getIsAuth
} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";
import {getNewMessagesCount} from "../../redux/reducers/dialogs-selectors";
import {ProfileType} from "../../redux/reducers/types";
import ConfirmDialog from "../Profile/Dialogs/ConfirmDialog";
import {Typography} from "@material-ui/core";

type MapStatePropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean,
    newMessagesCount: number | null,
    currentUserInfo: ProfileType | null
}

type MapDispatchPropsType = {
    logout: (history: any) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps

const HeaderContainer: FC<PropsType> = ({logout, ...props}) => {
    const [logoutDialogIsOpen, setLogoutDialogIsOpen] = useState(false);
    let history = useHistory();

    const openLogoutDialog = (open: boolean) => {
        setLogoutDialogIsOpen(open);
    };

     const logoutAction = () => {
        logout(history);
    };

    return (
        <>
            <Header {...props} openLogoutDialog={openLogoutDialog}/>
            <ConfirmDialog
                isOpen={logoutDialogIsOpen}
                openDialog={openLogoutDialog}
                confirmAction={logoutAction}>
                {true}
            </ConfirmDialog>
        </>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        userId: getCurrentUserId(state),
        login: getCurrentUserLogin(state),
        isAuth: getIsAuth(state),
        newMessagesCount: getNewMessagesCount(state),
        currentUserInfo: getCurrentUserInfo(state)
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps, AppStateType>(mapStateToProps, {logout}),
    withRouter
)(HeaderContainer) as FC;
