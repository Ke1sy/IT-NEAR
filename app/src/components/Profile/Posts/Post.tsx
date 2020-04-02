import React, {FC, useState} from 'react';
import {makeStyles, Typography, Paper, IconButton, Avatar, Divider} from "@material-ui/core";
import {PostsData_posts} from "../../../server/types/PostsData";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {grey} from '@material-ui/core/colors';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {ProfileType} from "../../../redux/reducers/types";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PostSubmenu from "./PostSubmenu";
type PropsType = {
    onDeletePost: (id: string) => void
    post: PostsData_posts,
    author: ProfileType,
    onUpdatePost: (id: string, text: string) => void,
}

const useStyles = makeStyles(theme => ({
    post: {
        backgroundColor: theme.palette.common.white,
        padding: '20px 25px 10px',
        marginBottom: 20,
        position: 'relative',
    },
    content: {
        padding: '20px 0'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10
    },
    likeBtn: {
        cursor: 'pointer',
        marginRight: 10,

        '&:hover': {
            '& $likeIcon': {
                color: theme.palette.secondary.main
            }
        }
    },
    likeIcon: {
        color: grey[300],
        transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    date: {
        fontSize: 12,
        color: grey[500],
    },
    head: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
        width: 50,
        height: 50,
    },
    more: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    moreIcon: {
        transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: theme.palette.primary.light,

        ' &:hover': {
            color: theme.palette.primary.main
        }
    }
}));

const Posts: FC<PropsType> = ({post: {id, text, likesCount, date}, onDeletePost, onUpdatePost, author: {fullName, userId, photos}}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const userAvatar = photos.large !== null ? photos.large : userPlaceholder;

    const handleClick = ({currentTarget}: any) => {
        setAnchorEl(currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDate = (date: string) => {
        const formattedDate = new Date(+date);
        return formattedDate.toLocaleDateString()  + ' at ' +  formattedDate.toLocaleTimeString().split(":").slice(0, -1).join(':');
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
                    postText={text}
                    postId={id}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    onDeletePost={onDeletePost}
                    onUpdatePost={onUpdatePost}
                />
            </div>
            <Typography variant="body1" className={classes.content}>
                {text}
            </Typography>
            <Divider/>
            <Typography variant="body2" className={classes.footer}>
                <IconButton className={classes.likeBtn} size="small">
                    <FavoriteIcon fontSize="small" className={classes.likeIcon}/>
                </IconButton>
                <Typography variant="body2" component="span">
                    {likesCount}
                </Typography>
            </Typography>

            {/*<button onClick={() => onDeletePost(id)}>Delete</button>*/}
        </Paper>
    )
};

export default Posts;
