import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, setUserStatus} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from '../Redirects/AuthRedirect'
import {compose} from "redux";

class ProfileContainer extends Component {
    state = {
        id: this.props.match.params.id
    };

    componentDidMount() {
       let {id} = this.state;
        if (!id) {
            this.setState({
                id: 2
            })
        }
        this.props.getUserProfile(id);
        this.props.getUserStatus(id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            let newId = this.props.match.params.id;
            this.setState({
                id: newId
            });
            this.props.getUserProfile(newId);
            this.props.getUserStatus(newId);
        }
    }

    render() {
        const {profile} = this.props;
        return (
            <Profile {...this.props} profile={profile}/>
        )
    }
}

const mapStateToProps = ({profileReducer: {profile, status}}) => {
    return {profile, status}
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, setUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
