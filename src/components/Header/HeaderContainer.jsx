import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const HeaderContainer = (props) => {
    return (
        <Header {...props}/>
    )
};

const mapStateToProps = ({authReducer: {userId, login, isAuth}}) => {
    return {userId, login, isAuth}
};

export default compose(
    connect(mapStateToProps, {logout}),
    withRouter,
)(HeaderContainer);
