import React, {FC} from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import {getCaptchaUrl, getCurrentUserId, getIsAuth} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";
import { LoginFormDataPropsType } from "../../redux/reducers/types";
import RM from "../../RouterManager";

type MapStatePropsType = {
    userId: number | null,
    isAuth: boolean,
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const LoginContainer: FC<PropsType> = ({login, isAuth, userId, captchaUrl}) => {
    const onSubmit = ({email, password, rememberMe, captcha}: LoginFormDataPropsType) => {
        login(email, password, rememberMe, captcha);
    };

    if (isAuth) {
        return <Redirect to={RM.profile.getPath(userId)}/>
    }

    return (
        <Login login={onSubmit} captchaUrl={captchaUrl}/>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: getIsAuth(state),
        userId: getCurrentUserId(state),
        captchaUrl: getCaptchaUrl(state)
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {login})(LoginContainer);