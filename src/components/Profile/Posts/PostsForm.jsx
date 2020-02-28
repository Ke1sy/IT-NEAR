import React from 'react';
import styles from './posts-form.module.scss';
import * as PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {minLength, required} from "../../../utils/validate";
import {renderField} from "../../Forms/components/FormControl";

const minLength5 = minLength(5);

function PostsForm(props) {
    const {handleSubmit, submitting, pristine} = props;

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
}


const PostsReduxForm = reduxForm({
    form: 'posts'
})(PostsForm);


PostsForm.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    onClick: PropTypes.func
};

export default PostsReduxForm;
