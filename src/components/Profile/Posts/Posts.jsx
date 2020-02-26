import React from 'react';
import styles from './posts.module.scss';
import Post from './Post';

const Posts = (props) => {
    const {posts, newPostText, addPost, updateNewPostText} = props;
    const onAddPost = () => {
        if (newPostText.length > 0) {
            addPost();
        }
    };

    const onPostChange = ({target: {value}}) => {
        updateNewPostText(value);
    };

    return (
        <div className={styles.posts}>
            <div className={styles.posts__title}>My Posts</div>
            <div className={styles.posts__form}>
                <textarea id="" cols="100" rows="5" onChange={onPostChange} value={newPostText}/>
                <button onClick={onAddPost}>Add Post</button>
            </div>
            {posts.map(({id, text, likesCount}) => (
                <Post id={id} text={text} key={id} likesCount={likesCount}/>
            ))}
        </div>
    )
};

export default Posts;
