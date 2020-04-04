import React, {FC} from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import {TextField, TextFieldProps, makeStyles, Checkbox, FormControlLabel, Switch} from "@material-ui/core";

const inputTypes = [
    'text',
    'email',
    'search',
    'password',
    'textarea'
];

const useStyles = makeStyles(theme => ({
    textInput: {
        marginBottom: 25,
        '& .MuiFormHelperText-root': {
            fontSize: 12,
            position: 'absolute',
            bottom: 0,
            transform: 'translateY(100%)',
        }
    }
}));

type OwnPropsType = {
    label?: string,
    type: string,
    rest?: any,
};
type PropsType = WrappedFieldProps & OwnPropsType & TextFieldProps;

export const RenderField: FC<PropsType> = ({input, label, type, meta: {touched, error}, ...rest}) => {
    const classes = useStyles();

    return (
        <>
            {inputTypes.includes(type) &&
            <TextField
                error={touched && Boolean(error)}
                helperText={touched && error ? error : ''}
                label={label}
                {...input}
                {...rest}
                type={type}
                fullWidth={true}
                className={classes.textInput}
            />
            }
            {type === 'checkbox' &&
            <FormControlLabel
                className={classes.textInput}
                control={
                    <Checkbox
                        checked={!!input.value}
                        onChange={input.onChange}
                    />
                }
                label={label}
            />
            }
            {type === 'switch' &&
            <FormControlLabel
                className={classes.textInput}
                control={
                    <Switch
                        checked={!!input.value}
                        onChange={input.onChange}
                    />
                }
                label={label}
            />
            }
        </>
    )
};
