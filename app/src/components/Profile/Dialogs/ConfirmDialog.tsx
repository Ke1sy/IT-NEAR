import React, {FC} from 'react';
import {Typography} from '@material-ui/core';
import {PostsData_posts} from "../../../server/types/PostsData";
import {OpenPostDialogType} from "../../../redux/reducers/types";
import SimpleDialogTemplate from './SimpleDialogTemplate';

type PropsType = {
    isOpen: boolean,
    openDialog: (isOpen: boolean,  type: OpenPostDialogType, selectedItem: PostsData_posts | null) => void,
    itemToConfirm?: PostsData_posts,
    confirmAction: any,
}

const ConfirmDialog: FC<PropsType> = ({isOpen, openDialog, confirmAction, itemToConfirm, children}) => {
    const handleClose = () => {
        openDialog(false, 'confirm', null);
    };

    const confirmActionSubmit = () => {
        itemToConfirm ? confirmAction(itemToConfirm.id) : confirmAction();
        handleClose();
    };
    return (
        <SimpleDialogTemplate
            open={isOpen}
            resetAction={handleClose}
            submitAction={confirmActionSubmit}
            aria-labelledby="delete-post-dialog"
            title="Are you sure?"
        >
            {children ? children :
                <Typography variant="body2">
                    {children ? children : 'If you click \'CONFIRM\' the element will be removed from database.'}
                </Typography>
            }

        </SimpleDialogTemplate>
    );
};

export default ConfirmDialog;