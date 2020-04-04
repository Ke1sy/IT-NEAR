import React, {useEffect, useState, FC} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    makeStyles
} from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import {PostsData_posts} from "../../../server/types/PostsData";

type PropsType = {
    open: boolean,
    selectedPost: PostsData_posts,
    onUpdatePost: (id: string, text: string) => void,
    openEditDialog: (isOpen: boolean, post: PostsData_posts | null) => void,
}


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.up('sm')]: {
            minWidth: 320
        },
    },
    title: {
        textAlign: 'center'
    },
    buttons: {
        justifyContent: 'space-between',
        padding: '8px 24px 16px'
    },
    btn: {
        width: '48%'
    }
}));

const EditDialog: FC<PropsType> = ({open, selectedPost: {text, id}, onUpdatePost, openEditDialog}) => {
    const [newText, setNewText] = useState(text);
    const classes = useStyles();

    const saveUpdatedPost = () => {
        if(newText) {
            onUpdatePost(id, newText);
            handleClose();
        }
    };

    const handleClose = () => {
        openEditDialog(false, null)
    };

    useEffect(() => {
        setNewText(text)
    }, [text]);


    const handleChange = ({target: {value}}: { target: { value: string } }) => {
        setNewText(value)
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="post-edit-form" fullWidth maxWidth="xs"
                classes={{
                    paper: classes.paper
                }}>
            <DialogTitle className={classes.title}>Edit post</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Edit post"
                    type="textarea"
                    multiline
                    rowsMax={8}
                    value={newText}
                    onChange={handleChange}
                    fullWidth
                    error={!newText}
                />
            </DialogContent>
            <DialogActions className={classes.buttons} disableSpacing>
                <Button onClick={saveUpdatedPost} className={classes.btn} color="primary" variant="contained" startIcon={<CheckCircleOutlineOutlinedIcon/>}>
                    Save
                </Button>
                <Button onClick={handleClose} className={classes.btn} color="secondary" variant="contained" startIcon={<CancelOutlinedIcon/>}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default EditDialog;