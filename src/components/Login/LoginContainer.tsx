import React, {FC} from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import {getCaptchaUrl, getCurrentUserId, getIsAuth} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    userId: number | null,
    isAuth: boolean,
    captchaUrl: string | null
}

type OnSubmitPropsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type MapDispatchPropsType = {
    login: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OnSubmitPropsType

const LoginContainer: FC<PropsType> = ({login, isAuth, userId, captchaUrl}) => {
    const onSubmit = ({email, password, rememberMe, captcha}: OnSubmitPropsType) => {
        login(email, password, rememberMe, captcha);
    };

    if (isAuth) {
        return <Redirect to={`/profile/${userId}`}/>
    }

    return (
        <Login onSubmit={onSubmit} captchaUrl={captchaUrl}/>
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