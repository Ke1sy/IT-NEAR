import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {appInitialize} from "./redux/reducers/app-reducer";
import Preloader from "./components/Preloader/Preloader";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import withSuspense from "./components/HOC/Suspense";

const ProfileContainer = React.lazy(() => import(/* webpackChunkName: "ProfileContainer" */"./components/Profile/ProfileContainer"));
const MessagesContainer = React.lazy(() => import(/* webpackChunkName: "MessagesContainer" */"./components/Messages/MessagesContainer"));
const LoginContainer = React.lazy(() => import(/* webpackChunkName: "LoginContainer" */"./components/Login/LoginContainer"));
const UsersContainer = React.lazy(() => import(/* webpackChunkName: "UsersContainer" */"./components/Users/UsersContainer"));
const News = React.lazy(() => import(/* webpackChunkName: "News" */"./components/News/News"));
const Music = React.lazy(() => import(/* webpackChunkName: "Music" */"./components/Music/Music"));

class App extends React.Component {
    componentDidMount() {
        this.props.appInitialize();
    }

    render() {
        if(!this.props.inited) {
            return <Preloader showPreloader={true}/>
        }
        return (
            <div className="app">
                <HeaderContainer/>
                <Navbar/>
                <div className="main">
                    <Switch>
                        <Route path="/profile/:id?" component={withSuspense(ProfileContainer)}/>
                        <Route path="/messages" component={withSuspense(MessagesContainer)}/>
                        <Route path="/news" component={withSuspense(News)}/>
                        <Route path="/login" component={withSuspense(LoginContainer)}/>
                        <Route path="/music" component={withSuspense(Music)}/>
                        <Route path="/users" component={withSuspense(UsersContainer)}/>
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

