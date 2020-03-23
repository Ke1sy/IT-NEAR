import React, {FC} from 'react';
import Posts from "./Posts";
import {compose} from "redux";
import { ChildDataProps, graphql } from "react-apollo";
import { postsQuery } from "../../../server/queries";
import { addPostMutation } from "../../../server/mutations";
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

type InputProps = {
    text: string,
    date: string
    authorId: number
};

type addPostType = {
    addPost: ({text, date, authorId} : InputProps) => any,
}

type PropsType = OwnProps & ChildProps & addPostType

const PostsContainer: FC<PropsType> = ({ data: { loading, posts, error }, addPost, authorId, isOwner}) => {
    if (loading) return <Preloader showPreloader={true}/>;
    if (error) return <h1>ERROR</h1>;
    return <Posts posts={posts} addPost={addPost} authorId={authorId} isOwner={isOwner}/>
};

const withGraphQL = compose(
    graphql<OwnProps, Response, {}, ChildProps>(postsQuery, {
        options: ({authorId}) => ({
            variables: {authorId}
        })
    }),

    graphql(addPostMutation, {
        props: ({mutate}: any) => ({
            addPost: ({text, date, authorId}: InputProps) => mutate({
                variables: {text, date, likesCount: 0, authorId},
                refetchQueries: [{
                    query: postsQuery,
                    variables: {authorId}
                }]
            })
        })
    })
);

export default compose(
    withGraphQL
)(PostsContainer)
