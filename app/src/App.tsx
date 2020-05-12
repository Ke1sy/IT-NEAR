import React, {Component} from 'react';
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {appActions} from "./redux/reducers/app-reducer";
import Preloader from "./components/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import withSuspense from "./components/HOC/Suspense";
import {getAppInited} from "./redux/reducers/app-selectors";
import {AppStateType} from "./redux/redux-store";
import {WithStyles, CssBaseline, Container} from "@material-ui/core";
import Notifier from "./components/Notifier/Notifier";
import {withSnackbar, WithSnackbarProps} from 'notistack';
import RM from "./RouterManager";
import Footer from "./components/Footer/Footer";
import {getCurrentUserInfo, getIsAuth} from "./redux/reducers/auth-selectors";
import withAppStyles from './appStyles'
import {GetMessageType, ProfileType} from "./redux/reducers/types";
import NewMessageNoty from "./components/Notifier/NewMessageNoty";
import {dialogActions} from "./redux/reducers/dialogs-reducer";
import {emitInitUser, socket} from "./utils/socket";

type MapStatePropsType = {
    inited: boolean,
    isAuth: boolean,
    currentUserInfo: ProfileType | null
}

type MapDispatchPropsType = {
    appInitialize: () => void,
    requestNewMessagesCount: () => void,
}

type PropsType = MapStatePropsType & MapDispatchPropsType & WithStyles & WithSnackbarProps;

class App extends Component<PropsType> {
    componentDidMount() {
        this.props.appInitialize();
        window.addEventListener("unhandledrejection", this.globalError);
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.currentUserInfo !== prevProps.currentUserInfo) {
            this.initSocket();
        }
    }

    initSocket = () => {
        const {requestNewMessagesCount, currentUserInfo} = this.props;
        if (!currentUserInfo) return;
        const {userId, fullName} = currentUserInfo;
        emitInitUser({userId, userName: fullName});
        socket.on('get_new_message', (msg: GetMessageType) => {
            this.props.enqueueSnackbar(
                <NewMessageNoty message={`New message from: ${msg.sender.name}`}/>, {variant: 'default'}
            );
            requestNewMessagesCount()
        });
    };

    globalError = (e: any) => {
        this.props.enqueueSnackbar(`${e.reason}`, {variant: 'error'});
    };

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.globalError);
    }

    render() {
        const {classes, inited} = this.props;
        if (!inited) {
            return <Preloader showPreloader={true}/>
        }
        return (
            <>
                <Notifier/>
                <CssBaseline/>
                <HeaderContainer/>
                <Container maxWidth="lg" component="main" className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        {Object.entries(RM).map(([key, route]) => {
                            const {path, exact = false, redirect = null, component: Cmp} = route;
                            const redirectPath = redirect ? redirect(this.props.isAuth) : '';
                            const RouteComponent = redirect ? <Redirect to={redirectPath}/> : withSuspense(Cmp);
                            return (
                                <Route
                                    key={key}
                                    path={path}
                                    exact={exact}
                                >
                                    {RouteComponent}
                                </Route>
                            )
                        })}
                    </Switch>
                </Container>
                <Footer/>
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        inited: getAppInited(state),
        isAuth: getIsAuth(state),
        currentUserInfo: getCurrentUserInfo(state)
    }
};

const {appInitialize} = appActions;
const {requestNewMessagesCount} = dialogActions;

export default compose(
    withAppStyles,
    withSnackbar,
    connect<MapStatePropsType, MapDispatchPropsType, WithSnackbarProps, AppStateType>(mapStateToProps, {
        appInitialize,
        requestNewMessagesCount
    }),
    withRouter
)(App) as React.ComponentType<any>;



