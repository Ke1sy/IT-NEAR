import React from 'react';
import {addPost} from "../../../redux/reducers/profile-reducer";
import Posts from "./Posts";
import {connect} from 'react-redux'

const mapStateToProps = ({profileReducer: {posts}}) => {
    return {
        posts
    }
};


export default connect(mapStateToProps, {addPost})(Posts);
