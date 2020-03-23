import React, {FC} from 'react';
import Posts from "./Posts";
import {compose} from "redux";
import {ChildDataProps, graphql} from "react-apollo";
import {postsQuery} from "../../../server/queries";
import {addPostMutation, updatePostMutation, deletePostMutation} from "../../../server/mutations";
import {PostType} from "../../../redux/reducers/types";
import Preloader from "../../Preloader/Preloader";

type OwnProps = {
    authorId: number,
    isOwner: boolean
}

type Response = {
    posts: PostType[];
};

type ChildProps = ChildDataProps<{}, Response, {}>;

type addPostProps = {
    text: string,
    date: string
    authorId: number
};

type deletePostProps = {
    id: string,
    authorId: number
};

type updatePostProps = {
    id: string,
    text: string,
    authorId: number
};

type mutationsPropsType = {
    addPost: ({text, date, authorId}: addPostProps) => any,
    deletePost: ({id, authorId}: deletePostProps) => any,
    updatePost: ({id, text,  authorId}: updatePostProps) => any,
}

type PropsType = OwnProps & ChildProps & mutationsPropsType

const PostsContainer: FC<PropsType> = ({
           data: {loading, posts, error},
           authorId,
           isOwner,
           addPost,
           deletePost,
           updatePost
    }) => {

    const onAddPost = ({postText}: { postText: string }) => {
        if (postText.length > 0) {
            addPost({
                text: postText,
                date: new Date().toString(),
                authorId
            });
        }
    };

    const onDeletePost = (id: string) => {
        deletePost({
            id,
            authorId
        });
    };

    const onUpdatePost = (id: string, text: string) => {
        updatePost({
            id,
            text,
            authorId
        });
    };

    if (loading) return <Preloader showPreloader={true}/>;
    if (error) return <h1>ERROR</h1>;
    return <Posts
        posts={posts}
        authorId={authorId}
        isOwner={isOwner}
        onAddPost={onAddPost}
        onDeletePost={onDeletePost}
        onUpdatePost={onUpdatePost}
    />
};

const withGraphQL = compose(
    graphql<OwnProps, Response, {}, ChildProps>(postsQuery, {
        options: ({authorId}) => ({
            variables: {authorId}
        })
    }),

    graphql(addPostMutation, {
        props: ({mutate}: any) => ({
            addPost: ({text, date, authorId}: addPostProps) => mutate({
                variables: {text, date, likesCount: 0, authorId},
                refetchQueries: [{
                    query: postsQuery,
                    variables: {authorId}
                }]
            })
        })
    }),

    graphql(deletePostMutation, {
        props: ({mutate}: any) => ({
            deletePost: ({id, authorId}: deletePostProps) => mutate({
                variables: {id},
                refetchQueries: [{
                    query: postsQuery,
                    variables: {authorId}
                }]
            })
        })
    }),

    graphql(updatePostMutation, {
        props: ({mutate}: any) => ({
            updatePost: ({id, text, authorId}: updatePostProps) => mutate({
                variables: {id, text},
                refetchQueries: [{
                    query: postsQuery,
                    variables: {authorId}
                }]
            })
        })
    }),
);

export default compose(
    withGraphQL
)(PostsContainer)
