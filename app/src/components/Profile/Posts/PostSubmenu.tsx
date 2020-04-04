import React, { FC } from "react";
import {Menu, MenuItem, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import {PostsData_posts} from "../../../server/types/PostsData";

type PropsType = {
    onDeletePost: (id: string) => void
    post: PostsData_posts,
    openEditDialog: (isOpen: boolean, post: PostsData_posts | null) => void,
    anchorEl: any,
    handleClose: () => void
}

const useStyles = makeStyles(theme => ({
    menuItemText: {
        paddingLeft: 10
    },
    paper: {
        backgroundColor: theme.palette.common.white,
    }
}));

const PostSubmenu:FC<PropsType> = ({openEditDialog, onDeletePost, post, anchorEl, handleClose}) => {
    const classes = useStyles();
    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    className: classes.paper
                }}
            >
                <MenuItem onClick={() => openEditDialog(true, post)}>
                    <EditIcon fontSize="small"  color="primary"/>
                    <Typography variant="body2" className={classes.menuItemText}>
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => onDeletePost(post.id)}>
                    <DeleteIcon fontSize="small" color="secondary"/>
                    <Typography variant="body2" className={classes.menuItemText}>
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    )
};

export default PostSubmenu;