import React, { FC } from "react";
import {Menu, MenuItem, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";

type PropsType = {
    onDeletePost: (id: string) => void
    postText: string,
    postId: string,
    onUpdatePost: (id: string, text: string) => void,
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

const PostSubmenu:FC<PropsType> = ({onUpdatePost, onDeletePost, postText, postId , anchorEl, handleClose}) => {
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
                {/*todo update dialog*/}
                <MenuItem onClick={() => onUpdatePost('1','2')}>
                    <EditIcon fontSize="small"/>
                    <Typography variant="body2" className={classes.menuItemText}>
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => onDeletePost(postId)}>
                    <DeleteIcon fontSize="small"/>
                    <Typography variant="body2" className={classes.menuItemText}>
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    )
};

export default PostSubmenu;