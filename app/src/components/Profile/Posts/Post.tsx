import React, { FC } from 'react';
import styles from './post.module.scss';
import {PostType} from "../../../redux/reducers/types";

type PropsType = PostType & {
    onDeletePost: (id: string) => void
}

const Posts: FC<PropsType> = ({id, text, likesCount, date, onDeletePost }) => {
    const postDate = new Date(+date);
    return (
        <div className={styles.post} key={id}>
            <div className={styles.post__content}>
                <img src="https://imgur.com/I80W1Q0.png" className={styles.post__avatar} alt=""/>
                {text}
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
