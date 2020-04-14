import React, {FC} from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import {TextField, TextFieldProps, Checkbox, FormControlLabel, Switch, WithStyles} from "@material-ui/core";
import withFormControlStyles from "./formControlStyles";

const inputTypes = [
    'text',
    'email',
    'search',
    'password',
    'textarea'
];

type OwnPropsType = {
    label?: string,
    type: string,
    rest?: any,
};
type PropsType = WrappedFieldProps & OwnPropsType & TextFieldProps & WithStyles;

const Field: FC<PropsType> = ({classes, input, label, type, meta: {touched, error}, ...rest}) => {

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

export const RenderField = withFormControlStyles(Field);
