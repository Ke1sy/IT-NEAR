import React, { FC } from 'react';
import styles from './post.module.scss';
import {PostType} from "../../../redux/reducers/types";

const Posts: FC<PostType> = ({id, text, likesCount}) => {
    return (
        <div className={styles.post} key={id}>
            <div className={styles.post__content}>
                <img src="https://imgur.com/I80W1Q0.png" className={styles.post__avatar} alt=""/>
                {text}
            </div>
            <div className={styles.post__likes}>
                Likes: {likesCount}
            </div>
        </div>
    )
};

export default Posts;
