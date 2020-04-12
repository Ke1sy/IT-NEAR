import React from 'react';
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {appInitialize} from "./redux/reducers/app-reducer";
import Preloader from "./components/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import withSuspense from "./components/HOC/Suspense";
import {getAppInited} from "./redux/reducers/app-selectors";
import {AppStateType} from "./redux/redux-store";
import {createStyles, StyleRules, Theme, WithStyles, withStyles, CssBaseline, Container} from "@material-ui/core";
import Notifier from "./components/Notifier/Notifier";
import {withSnackbar, WithSnackbarProps} from 'notistack';
import RM from "./RouterManager";

const ProfileContainer = React.lazy(() => import(/* webpackChunkName: "ProfileContainer" */"./components/Profile/ProfileContainer"));
const MessagesContainer = React.lazy(() => import(/* webpackChunkName: "MessagesContainer" */"./components/Messages/MessagesContainer"));
const LoginContainer = React.lazy(() => import(/* webpackChunkName: "LoginContainer" */"./components/Login/LoginContainer"));
const UsersContainer = React.lazy(() => import(/* webpackChunkName: "UsersContainer" */"./components/Users/UsersContainer"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "Music" */"./components/NotFound/NotFound"));

type MapStatePropsType = {
    inited: boolean
}

type MapDispatchPropsType = {
    appInitialize: () => void
}

const styles = (theme: Theme): StyleRules => createStyles({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },

    toolbar: theme.mixins.toolbar,
});

type PropsType = MapStatePropsType & MapDispatchPropsType & WithStyles<typeof styles> & WithSnackbarProps;

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.appInitialize();
        window.addEventListener("unhandledrejection", this.globalError);
    }

    globalError = (e: any) => {
        this.props.enqueueSnackbar(`${e.reason}`, {variant: 'error'});
    };

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.globalError);
    }

    render() {
        const {classes} = this.props;
        if (!this.props.inited) {
            return <Preloader showPreloader={!this.props.inited}/>
        }
        return (
            <>
                <Notifier/>
                <CssBaseline/>
                <HeaderContainer/>
                <Container maxWidth="lg" component="main" className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route exact path={RM.home.path} render={() => <Redirect to={RM.profile.getPath(null)}/>}/>
                        <Route path={RM.profile.path} component={withSuspense(ProfileContainer)}/>
                        <Route path={RM.settings.path} component={withSuspense(ProfileContainer)}/>
                        <Route path={RM.dialogs.path} component={withSuspense(MessagesContainer)}/>
                        <Route path={RM.login.path} component={withSuspense(LoginContainer)}/>
                        <Route path={RM.users.path} component={withSuspense(UsersContainer)}/>
                        <Route path="*" component={withSuspense(NotFound)}/>
                    </Switch>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        inited: getAppInited(state)
    }
};


export default compose(
    withStyles(styles),
    withSnackbar,
    connect<MapStatePropsType, MapDispatchPropsType, WithSnackbarProps, AppStateType>(mapStateToProps, {appInitialize}),
    withRouter
)(App) as React.ComponentType<any>;



