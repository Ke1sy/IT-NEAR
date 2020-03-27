import {Field, reduxForm, InjectedFormProps} from "redux-form";
import React, {FC} from "react";
import {RenderField} from "../../Forms/components/FormControl";
import styles from './messages-form.module.scss';

type FormDataType = {
    message: string
};

const MessageForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit, submitting}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Field
                name="message"
                type="textarea"
                component={RenderField}
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

const MessageReduxForm = reduxForm<FormDataType>({
    form: 'message'
})(MessageForm);

export default MessageReduxForm;
