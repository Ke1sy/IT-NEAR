import React, {FC, useEffect, useState} from 'react';
import Posts from "./Posts";
import Preloader from "../../Preloader/Preloader";
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_POSTS} from "../../../server/queries";
import {ADD_POST, DELETE_POST, UPDATE_POST} from "../../../server/mutations";
import {PostsData, PostsDataVariables, PostsData_posts} from '../../../server/types/PostsData';
import {AddPostMutation, AddPostMutationVariables} from '../../../server/types/AddPostMutation';
import {DeletePostMutation, DeletePostMutationVariables} from '../../../server/types/DeletePostMutation';
import {UpdatePostMutation, UpdatePostMutationVariables} from '../../../server/types/UpdatePostMutation';
import {ProfileType} from "../../../redux/reducers/types";
import {reset} from "redux-form";
import { useDispatch } from 'react-redux';
import {Alert} from "@material-ui/lab";

type PropsType = {
    authorId: number,
    isOwner: boolean,
    author: ProfileType,
}

const PostsContainer: FC<PropsType> = ({authorId, isOwner, author}) => {
    const {data, loading: dataLoading} = useQuery<PostsData, PostsDataVariables>(GET_POSTS, {
        variables: {authorId},
    });
    const [addPost, {loading: addPostLoading, error: addPostError}] = useMutation<AddPostMutation, AddPostMutationVariables>(ADD_POST);
    const [deletePost] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST);
    const [updatePost] = useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UPDATE_POST);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<PostsData_posts | null>(null);
    const dispatch = useDispatch();

    const onAddPost = ({postText}: { postText: string}) => {
        if (postText && postText.length > 0) {
            addPost({
                variables: {
                    text: postText,
                    date: new Date().toString(),
                    authorId,
                    likesCount: 0
                },
                refetchQueries: [{
                    query: GET_POSTS,
                    variables: {authorId}
                }]
            }).then(() => dispatch(reset('posts')))
        }
    };

    const onDeletePost = (id: string) => {
        deletePost({
            variables: {
                id
            },
            refetchQueries: [{
                query: GET_POSTS,
                variables: {authorId}
            }]
        });
    };

    const onUpdatePost = (id: string, text: string) => {
        updatePost({
            variables: {id, text},
            refetchQueries: [{
                query: GET_POSTS,
                variables: {authorId}
            }]
        });
    };

    const openEditDialog = (isOpen: boolean, post: PostsData_posts | null) => {
        setSelectedPost(post);
        setEditDialogIsOpen(isOpen);
    };

    if (dataLoading  || !data) return <Preloader showPreloader={true}/>;
    const {posts} = data;
    return (
        <Posts
            posts={posts}
            authorId={authorId}
            isOwner={isOwner}
            onAddPost={onAddPost}
            onDeletePost={onDeletePost}
            onUpdatePost={onUpdatePost}
            author={author}
            editDialogIsOpen={editDialogIsOpen}
            openEditDialog={openEditDialog}
            selectedPost={selectedPost}
            addPostLoading={addPostLoading}
        />
    )
};
export default PostsContainer;
