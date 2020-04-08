import React, {useState, FC} from 'react';
import {TextField,} from "@material-ui/core";
import {PostsData_posts} from "../../../server/types/PostsData";
import {OpenPostDialogType} from "../../../redux/reducers/types";
import SimpleDialogTemplate from "./SimpleDialogTemplate";

type PropsType = {
    isOpen: boolean,
    itemToEdit: PostsData_posts,
    onEditPost: (newText: string, post: PostsData_posts) => void,
    openDialog: (isOpen: boolean, type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
}

const EditDialog: FC<PropsType> = ({isOpen, itemToEdit, onEditPost, openDialog}) => {
    const [newText, setNewText] = useState(itemToEdit.text);

    const saveUpdatedPost = () => {
        if (newText) {
            onEditPost(newText, itemToEdit);
            handleClose();
        }
    };

    const handleClose = () => {
        openDialog(false, 'edit', null)
    };

    const handleChange = ({target: {value}}: { target: { value: string } }) => {
        setNewText(value)
    };

    return (
        <SimpleDialogTemplate
            open={isOpen}
            resetAction={handleClose}
            submitAction={saveUpdatedPost}
            aria-labelledby="edit-post-dialog"
            title="Edit Post"
        >
            <TextField
                autoFocus
                margin="dense"
                label="Edit post"
                type="textarea"
                multiline
                rowsMax={10}
                value={newText}
                onChange={handleChange}
                fullWidth
                error={!newText}
            />
        </SimpleDialogTemplate>
    )
};

export default EditDialog;