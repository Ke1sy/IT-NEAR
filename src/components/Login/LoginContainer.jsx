import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";

const LoginContainer = ({login, isAuth, userId}) => {
    const onSubmit = ({email, password, rememberMe}) => {
        login(email, password, rememberMe);
    };

    if(isAuth) {
        return <Redirect to={`/profile/${userId}`}/>
    }

    return (
       <Login onSubmit={onSubmit}/>
    )
};

const mapStateToProps = ({authReducer: {isAuth, userId}}) => {
    return {isAuth, userId}
};


export default connect(mapStateToProps, {login})(LoginContainer);