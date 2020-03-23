import React, {FC, useEffect} from 'react';
import styles from './posts.module.scss';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostType} from "../../../redux/reducers/types";
type InputProps = {
    text: string,
    date: string,
    authorId: number
};

type PropsType = {
    posts: Array<PostType> | undefined,
    addPost: ({text, date, authorId} : InputProps) => any,
    authorId: number,
    isOwner: boolean
}


const Posts: FC<PropsType> = React.memo(({posts =[], addPost, authorId, isOwner}) => {
    const onAddPost = ({postText}: { postText: string }) => {
        if (postText.length > 0) {
            addPost({
                text: postText,
                date: new Date().toString(),
                authorId: authorId
            });
        }
    };

    return (
        <div className={styles.posts}>
            <div className={styles.posts__title}>Posts</div>
            {isOwner &&
                <PostsForm onSubmit={onAddPost}/>
            }
            {posts.map(({id, text, likesCount, date, authorId}: PostType) => (
                <Post id={id} text={text} key={id} date={date} likesCount={likesCount} authorId={authorId}/>
            ))}
        </div>
    )
});

export default Posts;
