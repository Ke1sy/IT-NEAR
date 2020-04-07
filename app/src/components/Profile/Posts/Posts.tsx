import React, {FC} from 'react';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostsData_posts} from '../../../server/types/PostsData';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";
import StyledDivider from "./StyledDivider";
import {OpenPostDialogType, ProfileType} from "../../../redux/reducers/types";
import EditDialog from "../Dialogs/EditDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";

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
    openDialog: (isOpen: boolean, selectedItem: PostsData_posts | null, type: OpenPostDialogType) => void,

    selectedPost: null | PostsData_posts,
    addPostLoading: boolean,
    onLikePost: (userId: string, post: PostsData_posts) => void
}

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
    },
    emptyText: {
        padding: 25
    }
}));


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
    const classes = useStyles();

    return (
        <>
            {isOwner &&
            <PostsForm onSubmit={onAddPost} addPostLoading={addPostLoading}/>
            }
            {
                posts && !posts.length &&
                <>
                    <Paper className={classes.paper}>
                        {!isOwner && <StyledDivider/>}
                        <Typography variant="body1" className={classes.emptyText}>
                            There are no posts yet...
                        </Typography>
                    </Paper>
                </>
            }

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

                    <DeleteDialog
                        isOpen={deleteDialogIsOpen}
                        openDialog={openDialog}
                        deleteAction={onDeletePost}
                        itemToDelete={selectedPost}
                    />
                </>
            }
        </>
    )
});

export default Posts;
