import React, {FC} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {compose} from "redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {getCurrentUserId, getCurrentUserLogin, getIsAuth} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean
}

type MapDispatchPropsType = {
    logout: (history: any) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps

const HeaderContainer: FC<PropsType> = (props) => {
    return (
        <Header {...props}/>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        userId: getCurrentUserId(state),
        login: getCurrentUserLogin(state),
        isAuth: getIsAuth(state),
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps, AppStateType>(mapStateToProps, {logout}),
    withRouter
)(HeaderContainer) as React.ComponentType<any>;
