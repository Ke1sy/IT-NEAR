import React, { FC } from "react";
import {Menu, MenuItem, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import {PostsData_posts} from "../../../server/types/PostsData";
import {grey} from '@material-ui/core/colors';
import {OpenPostDialogType} from "../../../redux/reducers/types";

type PropsType = {
    post: PostsData_posts,
    anchorEl: any,
    handleClose: () => void,
    openDialog: (isOpen: boolean, type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
}

const useStyles = makeStyles(theme => ({
    menuItemText: {
        paddingLeft: 10,
        color: grey[600],

    },
    menuItemIcon: {
        color: grey[600],
    },
    paper: {
        backgroundColor: theme.palette.common.white,
    }
}));

const PostSubmenu:FC<PropsType> = ({post, anchorEl, handleClose, openDialog}) => {
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
                <MenuItem onClick={() => openDialog(true,  'edit', post)}>
                <EditIcon fontSize="small" className={classes.menuItemIcon}/>
                    <Typography variant="body2" className={classes.menuItemText}>
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => openDialog(true, 'confirm',  post,)}>
                    <DeleteIcon fontSize="small" className={classes.menuItemIcon}/>
                    <Typography variant="body2" className={classes.menuItemText}>
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    )
};

export default PostSubmenu;