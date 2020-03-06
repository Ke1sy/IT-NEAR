import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {getCurrentUserId, getCurrentUserLogin, getIsAuth} from "../../redux/reducers/auth-selectors";

const HeaderContainer = (props) => {
    return (
        <Header {...props}/>
    )
};

const mapStateToProps = (state) => {
    return {
        userId: getCurrentUserId(state),
        login: getCurrentUserLogin(state),
        isAuth: getIsAuth(state),
    }
};

export default compose(
    connect(mapStateToProps, {logout}),
    withRouter,
)(HeaderContainer);
