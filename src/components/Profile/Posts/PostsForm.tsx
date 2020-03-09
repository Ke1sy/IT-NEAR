import React, {FC, ComponentProps} from 'react';
import styles from './posts-form.module.scss';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {minLength, required} from "../../../utils/validate";
import {renderField} from "../../Forms/components/FormControl";

const minLength5 = minLength(5);

interface PassedProps extends ComponentProps<any> {
    onSubmit: any
}

type PropsType = InjectedFormProps & PassedProps

const PostsForm: FC<PropsType> = ({handleSubmit, submitting, pristine}) => {
    return (
        <form className={styles.posts__form} onSubmit={handleSubmit}>
            <Field
                placeholder="Type text..."
                component={renderField}
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

const PostsReduxForm = reduxForm<{}, PassedProps>({
    form: 'posts'
})(PostsForm);

export default PostsReduxForm;
