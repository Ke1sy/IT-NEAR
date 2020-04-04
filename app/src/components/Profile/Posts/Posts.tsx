import React, {FC} from 'react';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostsData_posts} from '../../../server/types/PostsData';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";
import StyledDivider from "./StyledDivider";
import {ProfileType} from "../../../redux/reducers/types";
import EditDialog from "../Dialogs/EditDialog";

type PropsType = {
    posts: PostsData_posts[] | null,
    onAddPost: ({postText}: { postText: string }) => void,
    onDeletePost: (id: string) => void,
    onUpdatePost: (id: string, text: string) => void,
    authorId: number,
    isOwner: boolean,
    author: ProfileType,
    editDialogIsOpen: boolean,
    openEditDialog: (isOpen: boolean, post: PostsData_posts | null) => void,
    selectedPost: null | PostsData_posts,
    addPostLoading: boolean
}

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
    },
    emptyText: {
        padding: 25
    }
}));


const Posts: FC<PropsType> = (({posts = [], authorId, isOwner, onAddPost, onDeletePost, onUpdatePost, author, selectedPost, editDialogIsOpen, openEditDialog, addPostLoading}) => {
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
            {posts && posts.length > 0 && posts.map((post) => (
                <Post post={post} key={post.id} onDeletePost={onDeletePost} openEditDialog={openEditDialog} author={author}/>
            ))}

            {selectedPost &&
            <EditDialog
                open={editDialogIsOpen}
                selectedPost={selectedPost}
                onUpdatePost={onUpdatePost}
                openEditDialog={openEditDialog}
            />
            }
        </>
    )
});

export default Posts;
