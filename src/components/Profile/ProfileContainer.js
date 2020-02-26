import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";

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
    return {
        profile
    }
};

const ProfileContainerWithUrl = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile})(ProfileContainerWithUrl);
