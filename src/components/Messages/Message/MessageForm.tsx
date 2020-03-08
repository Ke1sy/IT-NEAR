import {Field, reduxForm, InjectedFormProps} from "redux-form";
import React, {FC, ComponentProps} from "react";
import {renderField} from "../../Forms/components/FormControl";
import styles from './messages-form.module.scss';

interface PassedProps extends ComponentProps<any> {
    onSubmit: any
}

type Props = PassedProps & InjectedFormProps;

const MessageForm: FC<Props> = ({handleSubmit, submitting, onSubmit}) => {
    debugger
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

const MessageReduxForm = reduxForm<{}, PassedProps>({
    form: 'message'
})(MessageForm);

export default MessageReduxForm;
