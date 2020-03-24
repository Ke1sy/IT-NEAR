import React, { FC } from 'react';
import styles from './post.module.scss';
import {Typography} from "@material-ui/core";
import {PostsData_posts} from "../../../server/types/PostsData";

type PropsType = {
    onDeletePost: (id: string) => void
    post: PostsData_posts
}

const Posts: FC<PropsType> = ({post: {id, text, likesCount, date}, onDeletePost }) => {
    const postDate = new Date(+date);
    return (
        <div className={styles.post}>
            <div className={styles.post__content}>
                <img src="https://imgur.com/I80W1Q0.png" className={styles.post__avatar} alt=""/>
                <Typography variant="body2">
                    {text}
                </Typography>
            </div>
            <div className={styles.post__likes}>
                Likes: {likesCount}
            </div>
            <div className={styles.post__likes}>
                Posted: {postDate.toLocaleString()}
            </div>
            <button onClick={() => onDeletePost(id)}>Delete</button>
        </div>
    )
};

export default Posts;
