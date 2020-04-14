import React, {FC, useState} from 'react';
import {Typography, Paper, IconButton, Avatar, Divider, WithStyles} from "@material-ui/core";
import {PostsData_posts} from "../../../server/types/PostsData";
import FavoriteIcon from '@material-ui/icons/Favorite';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {OpenPostDialogType, ProfileType} from "../../../redux/reducers/types";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PostSubmenu from "./PostSubmenu";
import classNames from "classnames";
import withPostStyles from './postStyles';

type PropsType = {
    post: PostsData_posts,
    author: ProfileType,
    onLikePost: (userId: string, post: PostsData_posts) => void,
    ownerId: number | null,
    isOwner: Boolean,
    openDialog: (isOpen: boolean, type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
}

const Post: FC<PropsType & WithStyles> = ({post, author: {fullName, photos}, openDialog, onLikePost, ownerId, isOwner, classes}) => {
    const {text, date, likedBy} = post;
    const [anchorEl, setAnchorEl] = useState(null);
    const userAvatar = photos.large !== null ? photos.large : userPlaceholder;
    const likedByCurrentUser = likedBy.includes(String(ownerId));

    const handleClick = ({currentTarget}: any) => {
        setAnchorEl(currentTarget);
    };

    const onLikePostAction = () => {
        if (ownerId) {
            onLikePost(String(ownerId), post)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDate = (date: string) => {
        const formattedDate = new Date(+date);
        return formattedDate.toLocaleDateString() + ' at ' + formattedDate.toLocaleTimeString().split(":").slice(0, -1).join(':');
    };

    const postDate = getDate(date);

    return (
        <Paper className={classes.post}>
            <div className={classes.head}>
                <Avatar src={userAvatar} alt="avatar" sizes="50" className={classes.avatar}/>
                <div>
                    <Typography variant="subtitle1">
                        {fullName}
                    </Typography>
                    <Typography variant="body2" className={classes.date}>
                        {postDate}
                    </Typography>
                </div>
                {isOwner &&
                <>
                    <IconButton
                        aria-label="more"
                        aria-controls="post-submenu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        className={classes.more}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <PostSubmenu
                        post={post}
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        openDialog={openDialog}
                    />
                </>
                }

            </div>
            <Typography variant="body1" className={classes.content}>
                {text}
            </Typography>
            <Divider/>
            <Typography variant="body2" className={classes.footer}>
                <IconButton className={
                    classNames(classes.likeBtn, {[classes.isLiked]: likedByCurrentUser})
                } size="small" onClick={onLikePostAction} disabled={!ownerId}>
                    <FavoriteIcon fontSize="small" className={classes.likeIcon}/>
                </IconButton>
                <Typography variant="body2" component="span">
                    {likedBy.length}
                </Typography>
            </Typography>
        </Paper>
    )
};

export default withPostStyles(Post);
