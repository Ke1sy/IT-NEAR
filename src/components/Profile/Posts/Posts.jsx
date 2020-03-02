import React from 'react';
import styles from './posts.module.scss';
import Post from './Post';
import PostsForm from "./PostsForm";

const Posts = React.memo(props => {
    const {posts, addPost} = props;
    const onAddPost = ({postText}) => {
        if (postText.length > 0) {
            addPost(postText);
        }
    };

    return (
        <div className={styles.posts}>
            <div className={styles.posts__title}>My Posts</div>
            <PostsForm onSubmit={onAddPost}/>
            {posts.map(({id, text, likesCount}) => (
                <Post id={id} text={text} key={id} likesCount={likesCount}/>
            ))}
        </div>
    )
});

export default Posts;
