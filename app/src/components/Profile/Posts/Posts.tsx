import React, {FC} from 'react';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostType} from "../../../redux/reducers/types";

type PropsType = {
    posts: Array<PostType> | undefined,
    onAddPost: ({postText}: { postText: string }) => void,
    onDeletePost: (id: string) => void,
    onUpdatePost: (id: string, text: string) => void,
    authorId: number,
    isOwner: boolean
}

const Posts: FC<PropsType> = (({posts = [], authorId, isOwner, onAddPost, onDeletePost, onUpdatePost}) => {
    return (
        <div>
            {isOwner &&
            <PostsForm onSubmit={onAddPost}/>
            }
            {posts.map(({id, text, likesCount, date, authorId}: PostType) => (
                <Post id={id} text={text} key={id} date={date} likesCount={likesCount} authorId={authorId} onDeletePost={onDeletePost}/>
            ))}
        </div>
    )
});

export default Posts;
