import React, {FC} from 'react';
import styles from './posts.module.scss';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostType} from "../../../redux/reducers/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (text: string) => void
}

const Posts: FC<PropsType> = React.memo(props => {
    const {posts, addPost} = props;
    const onAddPost = ({postText}: { postText: string }) => {
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
