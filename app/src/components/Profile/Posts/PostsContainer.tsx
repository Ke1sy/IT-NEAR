import React, {FC, useState} from 'react';
import Posts from "./Posts";
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_POSTS} from "../../../server/queries";
import {ADD_POST, DELETE_POST, UPDATE_POST} from "../../../server/mutations";
import {PostsData, PostsDataVariables, PostsData_posts} from '../../../server/types/PostsData';
import {AddPostMutation, AddPostMutationVariables} from '../../../server/types/AddPostMutation';
import {DeletePostMutation, DeletePostMutationVariables} from '../../../server/types/DeletePostMutation';
import {UpdatePostMutation, UpdatePostMutationVariables} from '../../../server/types/UpdatePostMutation';
import {ProfileType, OpenPostDialogType} from "../../../redux/reducers/types";
import {reset} from "redux-form";
import {useDispatch} from 'react-redux';
import PostsEmpty from "./PostsEmpty";

type PropsType = {
    authorId: number,
    isOwner: boolean,
    author: ProfileType,
    currentUserInfo: ProfileType | null
}

const PostsContainer: FC<PropsType> = ({authorId, isOwner, author, currentUserInfo}) => {
    const {data, loading: dataLoading} = useQuery<PostsData, PostsDataVariables>(GET_POSTS, {
        variables: {authorId},
    });
    const [addPost, {loading: addPostLoading}] = useMutation<AddPostMutation, AddPostMutationVariables>(ADD_POST);
    const [deletePost] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST);
    const [updatePost] = useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UPDATE_POST);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<PostsData_posts | null>(null);
    const dispatch = useDispatch();

    const onAddPost = ({postText}: { postText: string }) => {
        if (postText && postText.length > 0) {
            addPost({
                variables: {
                    text: postText,
                    date: new Date().toString(),
                    authorId,
                    likedBy: []
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

    const onEditPost = (newText: string, post: PostsData_posts) => {
        let {id, likedBy} = post;
        updatePost({
            variables: {id, text: newText, likedBy},
            refetchQueries: [{
                query: GET_POSTS,
                variables: {authorId}
            }]
        });
    };

    const onLikePost = (userId: string, post: PostsData_posts) => {
        let {id, text, likedBy} = post;
        likedBy = likedBy.includes(userId) ? likedBy.filter(item => item !== userId) : [...likedBy, userId];
        updatePost({
            variables: {id, text, likedBy},
            refetchQueries: [{
                query: GET_POSTS,
                variables: {authorId}
            }]
        });
    };

    const openDialog = (isOpen: boolean, type: OpenPostDialogType, selectedItem: PostsData_posts | null) => {
        setSelectedPost(selectedItem);
        switch (type) {
            case "confirm":
                setDeleteDialogIsOpen(isOpen);
                break;
            case "edit":
                setEditDialogIsOpen(isOpen);
                break;
            default:
                break;
        }
    };

    if (dataLoading || !data) return <PostsEmpty isLoading={true} isOwner={isOwner}/>;

    const {posts} = data;
    return (
        <Posts
            posts={posts}
            isOwner={isOwner}
            ownerId={currentUserInfo ? currentUserInfo.userId : null}
            onAddPost={onAddPost}
            onDeletePost={onDeletePost}
            onEditPost={onEditPost}
            author={author}
            editDialogIsOpen={editDialogIsOpen}
            deleteDialogIsOpen={deleteDialogIsOpen}
            selectedPost={selectedPost}
            addPostLoading={addPostLoading}
            onLikePost={onLikePost}
            openDialog={openDialog}
        />
    )
};
export default PostsContainer;
