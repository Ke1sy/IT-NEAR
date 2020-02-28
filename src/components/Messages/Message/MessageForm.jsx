import styles from "../messages.module.scss";
import {Field, reduxForm} from "redux-form";
import React from "react";

const MessageForm = (props) => {
    const {handleSubmit, submitting} = props;
    return (
        <form className={styles.messages__form} onSubmit={handleSubmit}>
            <Field
                name="message"
                component="textarea"
                placeholder="Type message..."
                required
            />

            <button type="submit" disabled={submitting}>
                Send
            </button>
        </form>
    )
};

const MessageReduxForm = reduxForm({
    form: 'message'
})(MessageForm);

export default MessageReduxForm;
