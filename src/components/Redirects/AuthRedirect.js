import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuth} from "../../redux/reducers/auth-selectors";

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state)
    }
};

export const withAuthRedirect = (WrappedComponent) => {
    class RedirectComponent extends Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login"/>;
            return <WrappedComponent {...this.props}/>
        }
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent);
    return ConnectedRedirectComponent;
};