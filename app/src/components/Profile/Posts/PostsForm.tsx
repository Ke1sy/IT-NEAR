import React, {FC} from 'react';
import styles from './posts-form.module.scss';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {minLength, required} from "../../../utils/validate";
import {RenderField} from "../../Forms/components/FormControl";

const minLength5 = minLength(5);

type FormDataType = {
    postText: string
}

type PropsType = InjectedFormProps<FormDataType>

const PostsForm: FC<PropsType> = ({handleSubmit, submitting, pristine}) => {
    return (
        <form className={styles.posts__form} onSubmit={handleSubmit}>
            <Field
                placeholder="Type text..."
                component={RenderField}
                type="textarea"
                name="postText"
                validate={[required, minLength5]}
            />

            <button type="submit" disabled={pristine || submitting}>
                Add Post
            </button>
        </form>
    );
};

const PostsReduxForm = reduxForm<FormDataType>({
    form: 'posts'
})(PostsForm);

export default PostsReduxForm;
