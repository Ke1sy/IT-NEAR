import React, {FC} from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {RenderField} from "../../Forms/components/FormControl";
import {WithStyles, Button} from "@material-ui/core";
import withMessageFormStyles from "./messageFormStyles";
import {SendIcon} from "../../Icons/MeterialIcons";

type FormDataType = {
    message: string
};

const MessageForm: FC<InjectedFormProps<FormDataType> & WithStyles> = ({handleSubmit, submitting, classes}) => {
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Field
                name="message"
                type="textarea"
                component={RenderField}
                placeholder="Type message..."
                required={true}
                classes={{
                    root: classes.root,
                }}
                InputProps={{
                    className: classes.textarea
                }}
                variant="outlined"
                multiline
                rowsMax="2"
            />

            <Button type="submit" disabled={submitting} className={classes.button} color="primary" variant="contained">
                <SendIcon/>
            </Button>
        </form>
    )
};

const MessageReduxForm = reduxForm<FormDataType>({
    form: 'message'
})(withMessageFormStyles(MessageForm));

export default MessageReduxForm;
