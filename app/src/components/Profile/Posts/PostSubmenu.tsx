import React, { FC } from "react";
import {Menu, MenuItem, Typography, WithStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PostsData_posts} from "../../../server/types/PostsData";
import {OpenPostDialogType} from "../../../redux/reducers/types";
import withPostSubmenuStyles from "./postSubmenuStyles";

type PropsType = {
    post: PostsData_posts,
    anchorEl: any,
    handleClose: () => void,
    openDialog: (isOpen: boolean, type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
}

const PostSubmenu:FC<PropsType & WithStyles> = ({post, anchorEl, handleClose, openDialog, classes}) => {
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

export default withPostSubmenuStyles(PostSubmenu);