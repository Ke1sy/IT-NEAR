import React from 'react';
import {addPost} from "../../../redux/reducers/profile-reducer";
import Posts from "./Posts";
import {connect} from 'react-redux'

const mapStateToProps = ({profileReducer: {posts}}) => {
    return {
        posts
    }
};


const PostsContainer = connect(mapStateToProps, {addPost})(Posts);

export default PostsContainer;
