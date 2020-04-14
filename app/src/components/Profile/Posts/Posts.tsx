import React, {FC} from 'react';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostsData_posts} from '../../../server/types/PostsData';
import {OpenPostDialogType, ProfileType} from "../../../redux/reducers/types";
import EditDialog from "../Dialogs/EditDialog";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import PostsEmpty from "./PostsEmpty";

type PropsType = {
    posts: PostsData_posts[] | null,
    onAddPost: ({postText}: { postText: string }) => void,
    onDeletePost: (id: string) => void,
    onEditPost: (newText: string, post: PostsData_posts) => void,
    isOwner: boolean,
    ownerId: number | null,
    author: ProfileType,
    editDialogIsOpen: boolean,
    deleteDialogIsOpen: boolean,
    openDialog: (isOpen: boolean, type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
    selectedPost: null | PostsData_posts,
    addPostLoading: boolean,
    onLikePost: (userId: string, post: PostsData_posts) => void
}

const Posts: FC<PropsType> = (({
                                   posts = [],
                                   onLikePost,
                                   isOwner,
                                   ownerId,
                                   onAddPost,
                                   onDeletePost,
                                   onEditPost,
                                   author,
                                   selectedPost,
                                   addPostLoading,
                                   editDialogIsOpen,
                                   deleteDialogIsOpen,
                                   openDialog
}) => {

    return (
        <>
            {isOwner && <PostsForm onSubmit={onAddPost} addPostLoading={addPostLoading}/>}

            {posts && !posts.length && <PostsEmpty isOwner={isOwner} isLoading={false}/>}

            {posts && posts.length > 0 && posts.map(post => (
                <Post
                    post={post}
                    isOwner={isOwner}
                    key={post.id}
                    openDialog={openDialog}
                    author={author}
                    ownerId={ownerId}
                    onLikePost={onLikePost}
                />
            ))}

            {selectedPost &&
                <>
                    <EditDialog
                        isOpen={editDialogIsOpen}
                        itemToEdit={selectedPost}
                        onEditPost={onEditPost}
                        openDialog={openDialog}
                    />

                    <ConfirmDialog
                        isOpen={deleteDialogIsOpen}
                        openDialog={openDialog}
                        confirmAction={onDeletePost}
                        itemToConfirm={selectedPost}
                    />
                </>
            }
        </>
    )
});

export default Posts;
