import React, {FC} from 'react';
import Post from './Post';
import PostsForm from "./PostsForm";
import { PostsData_posts } from '../../../server/types/PostsData';

type PropsType = {
    posts: PostsData_posts[] | null,
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
            {posts && posts.length > 0 && posts.map((post, index) => (
              <Post post={post} key={post.id} onDeletePost={onDeletePost}/>
            ))}
        </div>
    )
});

export default Posts;
