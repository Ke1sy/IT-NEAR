import React from 'react';
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {appInitialize} from "./redux/reducers/app-reducer";
import Preloader from "./components/Preloader/Preloader";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import withSuspense from "./components/HOC/Suspense";
import NavbarContainer from "./components/Navbar/NavbarContainer";

const ProfileContainer = React.lazy(() => import(/* webpackChunkName: "ProfileContainer" */"./components/Profile/ProfileContainer"));
const MessagesContainer = React.lazy(() => import(/* webpackChunkName: "MessagesContainer" */"./components/Messages/MessagesContainer"));
const LoginContainer = React.lazy(() => import(/* webpackChunkName: "LoginContainer" */"./components/Login/LoginContainer"));
const UsersContainer = React.lazy(() => import(/* webpackChunkName: "UsersContainer" */"./components/Users/UsersContainer"));
const News = React.lazy(() => import(/* webpackChunkName: "News" */"./components/News/News"));
const Music = React.lazy(() => import(/* webpackChunkName: "Music" */"./components/Music/Music"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "Music" */"./components/NotFound/NotFound"));

class App extends React.Component {
    componentDidMount() {
        this.props.appInitialize();
        window.addEventListener("unhandledrejection",  (event) => {
            console.error(`Error has occured. Reason:  + ${event.reason}`);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection");
    }

    render() {
        if(!this.props.inited) {
            return <Preloader showPreloader={true}/>
        }
        return (
            <div className="app">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="main">
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                        <Route path="/profile/:id?" component={withSuspense(ProfileContainer)}/>
                        <Route path="/dialogs/:id?" component={withSuspense(MessagesContainer)}/>
                        <Route path="/news" component={withSuspense(News)}/>
                        <Route path="/login" component={withSuspense(LoginContainer)}/>
                        <Route path="/music" component={withSuspense(Music)}/>
                        <Route path="/users" component={withSuspense(UsersContainer)}/>
                        <Route path="*" component={withSuspense(NotFound)}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = ({app: {inited}}) => {
    return {inited}
};

export default compose(
    connect(mapStateToProps, {appInitialize}),
    withRouter
)(App);



