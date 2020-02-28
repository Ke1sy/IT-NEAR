import React, {Component} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authenticate, logout} from "../../redux/reducers/auth-reducer";


class HeaderContainer extends Component {
    componentDidMount() {
        this.props.authenticate();
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
};

const mapStateToProps = ({authReducer: {userId, login, isAuth}}) => {
    return {userId, login, isAuth}
};


export default connect(mapStateToProps, {authenticate, logout})(HeaderContainer);
