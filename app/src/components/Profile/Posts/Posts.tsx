import React, {FC} from 'react';
import Post from './Post';
import PostsForm from "./PostsForm";
import {PostsData_posts} from '../../../server/types/PostsData';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import {Divider, makeStyles} from "@material-ui/core";
import StyledDivider from "./StyledDivider";
import {ProfileType} from "../../../redux/reducers/types";

type PropsType = {
    posts: PostsData_posts[] | null,
    onAddPost: ({postText}: { postText: string }) => void,
    onDeletePost: (id: string) => void,
    onUpdatePost: (id: string, text: string) => void,
    authorId: number,
    isOwner: boolean,
    author: ProfileType
}

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
    },
    emptyText: {
        padding: 25
    }
}));


const Posts: FC<PropsType> = (({posts = [], authorId, isOwner, onAddPost, onDeletePost, onUpdatePost, author}) => {
    const classes = useStyles();

    return (
        <>
            {isOwner &&
            <PostsForm onSubmit={onAddPost}/>
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
            {posts && posts.length > 0 && posts.map((post, index) => (
                <Post post={post} key={post.id} onDeletePost={onDeletePost} onUpdatePost={onUpdatePost} author={author}/>
            ))}
        </>
    )
});

export default Posts;
