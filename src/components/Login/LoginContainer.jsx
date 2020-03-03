import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";

const LoginContainer = ({login, isAuth, userId, captchaUrl}) => {
    const onSubmit = ({email, password, rememberMe, captcha}) => {
        login(email, password, rememberMe, captcha);
    };

    if (isAuth) {
        return <Redirect to={`/profile/${userId}`}/>
    }

    return (
        <Login onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    )
};

const mapStateToProps = ({authReducer: {isAuth, userId, captchaUrl}}) => {
    return {isAuth, userId, captchaUrl}
};

export default connect(mapStateToProps, {login})(LoginContainer);