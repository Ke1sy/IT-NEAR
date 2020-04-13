import {Field, reduxForm, InjectedFormProps} from "redux-form";
import React, {FC} from "react";
import {RenderField} from "../../Forms/components/FormControl";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core";

type FormDataType = {
    message: string
};

const useStyles = makeStyles(theme => ({
    form: {
        display: "flex",
        backgroundColor: "#f3f5f7",
        padding: 10,
        [theme.breakpoints.up(769)]: {
            padding: 30,
        },
    },
    root: {
        flexGrow: 1,
        marginBottom: 0
    },
    textarea: {
        borderRadius: 0,
        [theme.breakpoints.down(769)]: {
            padding: '10px 14px'
        },
    },
    button: {
        height: "100%",
        borderRadius: 0
    }
}));

const MessageForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit, submitting}) => {
    const classes = useStyles();
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
})(MessageForm);

export default MessageReduxForm;
