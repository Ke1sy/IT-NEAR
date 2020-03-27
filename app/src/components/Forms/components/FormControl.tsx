import React, {FC} from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import {TextField, TextFieldProps, FormHelperText, makeStyles} from "@material-ui/core";

const inputTypes = [
    'text',
    'email',
    'checkbox',
    'password'
];

const useStyles = makeStyles(theme => ({
    textInput: {
        marginBottom: 20,
        '& .MuiFormHelperText-root': {
            fontSize: 10,
            position: 'absolute',
            bottom: 0,
            transform: 'translateY(100%)',
        }
    }
}));

type OwnPropsType = {
    groupClasses?: string
    label?: string,
    type: string,
    rest?: any
};
type PropsType = WrappedFieldProps & OwnPropsType & TextFieldProps;

export const RenderField: FC<PropsType> = ({input, groupClasses, label, type, meta: {touched, error}, ...rest}) => {
    const classes = useStyles();

    return (
        <>
            {inputTypes.includes(type) &&
            <TextField
                error={touched && error}
                helperText={touched && error ? error : ''}
                label={label}
                {...input}
                {...rest}
                type={type}
                fullWidth={true}
                className={classes.textInput}
                multiline={type === 'textarea'}
            />
            }
        </>
    )
};