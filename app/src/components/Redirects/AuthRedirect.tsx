import React, {Component, ComponentType, ReactNode} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuth} from "../../redux/reducers/auth-selectors";
import {AppStateType} from "../../redux/redux-store";
import RM from "../../RouterManager";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: getIsAuth(state)
    }
};

export const withAuthRedirect = (WrappedComponent: ComponentType<ReactNode>) => {
    class RedirectComponent extends Component<MapStatePropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to={RM.login.path}/>;
            return <WrappedComponent {...this.props}/>
        }
    }

    return connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(RedirectComponent);
};