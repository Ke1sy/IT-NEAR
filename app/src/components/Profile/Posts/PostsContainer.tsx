import React, {FC} from 'react';
import Posts from "./Posts";
import Preloader from "../../Preloader/Preloader";
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_POSTS} from "../../../server/queries";
import {ADD_POST, DELETE_POST, UPDATE_POST} from "../../../server/mutations";
import {PostsData, PostsDataVariables} from '../../../server/types/PostsData';
import {AddPostMutation, AddPostMutationVariables} from '../../../server/types/AddPostMutation';
import {DeletePostMutation, DeletePostMutationVariables} from '../../../server/types/DeletePostMutation';
import {UpdatePostMutation, UpdatePostMutationVariables} from '../../../server/types/UpdatePostMutation';
import {ProfileType} from "../../../redux/reducers/types";

type PropsType = {
    authorId: number,
    isOwner: boolean,
    author: ProfileType
}

const PostsContainer: FC<PropsType> = ({authorId, isOwner, author}) => {
    const {data, loading: dataLoading, error: dataError} = useQuery<PostsData, PostsDataVariables>(GET_POSTS, {
        variables: {authorId},
    });
    const [addPost, {loading: addPostLoading, error: addPostError}] = useMutation<AddPostMutation, AddPostMutationVariables>(ADD_POST);
    const [deletePost, {loading: deletePostLoading, error: deletePostError}] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST);
    const [updatePost, {loading: updatePostLoading, error: updatePostError}] = useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UPDATE_POST);

    const onAddPost = ({postText}: { postText: string }) => {
        if (postText.length > 0) {
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
            });
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

    if (dataLoading  || !data) return <Preloader showPreloader={true}/>;
    if (dataError || addPostError || deletePostError || updatePostError) return <h1>Error </h1>;
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
        />
    )
};
export default PostsContainer;
