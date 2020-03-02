import React from 'react';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";

import UsersContainer from "./components/Users/UsersContainer";
import {Switch, Route, withRouter} from "react-router-dom";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {appInitialize} from "./redux/reducers/app-reducer";
import Preloader from "./components/Preloader/Preloader";
import SettingsContainer from "./components/Settings/SettingsContainer";

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
                        <Route path="/profile/:id?" render={() => <ProfileContainer/>}/>
                        <Route path="/messages" render={() => <MessagesContainer/>}/>
                        <Route path="/news" component={News}/>
                        <Route path="/login" component={LoginContainer}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/settings" component={SettingsContainer}/>
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

