import {Field, reduxForm} from "redux-form";
import React from "react";
import {renderField} from "../../Forms/components/FormControl";
import styles from './messages-form.module.scss';


const MessageForm = ({handleSubmit, submitting}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Field
                name="message"
                type="textarea"
                component={renderField}
                placeholder="Type message..."
                required={true}
                groupClasses={styles.textarea}
            />

            <button type="submit" disabled={submitting} className={styles.button}>
                Send
            </button>
        </form>
    )
};

const MessageReduxForm = reduxForm({
    form: 'message'
})(MessageForm);

export default MessageReduxForm;
