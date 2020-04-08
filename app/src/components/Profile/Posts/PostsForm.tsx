import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {required} from "../../../utils/validate";
import {RenderField} from "../../Forms/components/FormControl";
import {IconButton, makeStyles, Paper} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import StyledDivider from "./StyledDivider";
import Preloader from "../../Preloader/Preloader";

type OwnPropsType = {
    addPostLoading: boolean
}

type FormDataType = {
    postText: string,
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '30px 25px',
        backgroundColor: theme.palette.common.white,
        marginBottom: 20
    },
    form: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start'
    },
    root: {
        flexGrow: 1,
        marginBottom: 0,
    },
    button: {
        marginLeft: 10
    },
    buttonIcon: {
        fontSize: '1.7rem'
    },
}));

type PropsType = InjectedFormProps<FormDataType> & OwnPropsType

const PostsForm: FC<PropsType> = ({handleSubmit, submitting, addPostLoading}) => {
    const classes = useStyles();
    return (
        <>
            <StyledDivider/>
            <Paper square className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Preloader showPreloader={addPostLoading}/>
                    <Field
                        placeholder="What's on your mind?"
                        name="postText"
                        type="textarea"
                        component={RenderField}
                        validate={[required]}
                        classes={{
                            root: classes.root,
                        }}
                        variant="outlined"
                    />
                    <IconButton type="submit" disabled={submitting || addPostLoading} aria-label="send" className={classes.button}>
                        <SendIcon color="primary" className={classes.buttonIcon}/>
                    </IconButton>
                </form>
            </Paper>
        </>
    );
};

const PostsReduxForm = reduxForm<FormDataType, OwnPropsType>({
    form: 'posts',
})(PostsForm);

export default PostsReduxForm;
