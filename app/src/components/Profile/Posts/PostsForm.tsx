import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {required} from "../../../utils/validate";
import {RenderField} from "../../Forms/components/FormControl";
import {IconButton, Paper, WithStyles} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import StyledDivider from "./StyledDivider";
import Preloader from "../../Preloader/Preloader";
import withPostsFormStyles from "./postFormStyles";

type OwnPropsType = {
    addPostLoading: boolean
}

type FormDataType = {
    postText: string,
}

type PropsType = InjectedFormProps<FormDataType> & OwnPropsType & WithStyles

const PostsForm: FC<PropsType> = ({handleSubmit, submitting, addPostLoading, classes}) => {
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
                        multiline
                        rowsMax="3"
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
})(withPostsFormStyles(PostsForm));

export default PostsReduxForm;
