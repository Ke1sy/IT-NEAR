import React from 'react';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";

import UsersContainer from "./components/Users/UsersContainer";
import {Switch, Route} from "react-router-dom";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = () => {
    return (
        <div className="app">
            <HeaderContainer/>
            <Navbar/>
            <div className="main">
                <Switch>
                    <Route path="/profile/:id?" render={() => <ProfileContainer/>}/>
                    <Route path="/messages" render={() => <MessagesContainer/>}/>
                    <Route path="/news" component={News}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/settings" component={Settings}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
};

export default App;
