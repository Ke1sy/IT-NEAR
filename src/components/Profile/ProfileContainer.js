import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";

class ProfileContainer extends Component {
    componentDidMount() {
        let {match} = this.props;
        let id = match.params.id;
        if (!id) {
            id = 2;
        }
        this.props.getUserProfile(id);
    }

    render() {
        const {profile} = this.props;
        return (
            <Profile {...this.props} profile={profile}/>
        )
    }
}

const mapStateToProps = ({profileReducer: {profile}}) => {
    return {profile}
};

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
