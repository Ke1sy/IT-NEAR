import React, {FC} from 'react';
import {Typography} from '@material-ui/core';
import {PostsData_posts} from "../../../server/types/PostsData";
import {OpenPostDialogType} from "../../../redux/reducers/types";
import SimpleDialogTemplate from './SimpleDialogTemplate';

type PropsType = {
    isOpen: boolean,
    openDialog: (isOpen: boolean,  type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
    itemToDelete?: PostsData_posts,
    deleteAction: any,
}

const DeleteDialog: FC<PropsType> = ({isOpen, openDialog, deleteAction, itemToDelete}) => {
    const handleClose = () => {
        openDialog(false, 'delete', null);
    };

    const deleteActionSubmit = () => {
        itemToDelete ? deleteAction(itemToDelete.id) : deleteAction();
        handleClose();
    };
    return (
        <SimpleDialogTemplate
            open={isOpen}
            resetAction={handleClose}
            submitAction={deleteActionSubmit}
            aria-labelledby="delete-post-dialog"
            title="Are you sure?"
        >
            <Typography variant="body2">
                If you click 'CONFIRM' the element will be removed from database.
            </Typography>
        </SimpleDialogTemplate>
    );
};

export default DeleteDialog;