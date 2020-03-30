import {Field, reduxForm, InjectedFormProps} from "redux-form";
import React, {FC} from "react";
import {RenderField} from "../../Forms/components/FormControl";
import styles from './messages-form.module.scss';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
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
                classes={{
                        root: styles.root,
                    }}
                InputProps={{
                    className: styles.textarea
                }}
                variant="outlined"
                rowsMax="2"
            />

            <Button type="submit" disabled={submitting} className={styles.button} color="primary" variant="contained">
                <SendIcon/>
            </Button>
        </form>
    )
};

const MessageReduxForm = reduxForm<FormDataType>({
    form: 'message'
})(MessageForm);

export default MessageReduxForm;
