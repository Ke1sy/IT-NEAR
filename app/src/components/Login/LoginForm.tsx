import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RenderField} from "../Forms/components/FormControl";
import {required, email, minLength} from "../../utils/validate";
import {LoginFormDataPropsType} from "../../redux/reducers/types";
import {Button, WithStyles} from "@material-ui/core";
import InputIcon from '@material-ui/icons/Input';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {Alert} from "@material-ui/lab";
import withLoginFormStyles from "./loginFormStyles";

const minLength4 = minLength(4);

type OwnPropsType = {
    captchaUrl?: string | null
}

type PropsType = InjectedFormProps<LoginFormDataPropsType> & OwnPropsType  & WithStyles;

const LoginForm: FC<PropsType> = (
    {
        handleSubmit,
        pristine,
        submitting,
        reset,
        error,
        captchaUrl,
        classes
    }
) => {
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Field
                component={RenderField}
                type="email"
                name="email"
                label="Email"
                required={true}
                variant="outlined"
                validate={[required, email]}
            />
            <Field
                component={RenderField}
                type="password"
                name="password"
                label="Password:"
                required={true}
                variant="outlined"
                validate={[required, minLength4]}
            />

            <Field
                name="rememberMe"
                id="rememberMe"
                component={RenderField}
                type="checkbox"
                label="Remember me"
            />

            {captchaUrl &&
            <div className={classes.captcha}>
                <img src={captchaUrl} alt=""/>
                <Field
                    name="captcha"
                    component={RenderField}
                    type="text"
                    variant="outlined"
                    label="Captcha"
                    validate={[required]}
                />
            </div>
            }
            <div className={classes.buttons}>
                <Button
                    type="submit"
                    disabled={pristine || submitting}
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    startIcon={<InputIcon/>}
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                    variant="contained"
                    className={classes.btn}
                    color="secondary"
                    startIcon={<CancelOutlinedIcon/>}
                >
                    Clear
                </Button>
            </div>

            {error &&
            <Alert severity="error" className={classes.error}>{error}</Alert>
            }
        </form>
    )
};


const LoginReduxForm = reduxForm<LoginFormDataPropsType, OwnPropsType>({
    form: 'login'
})(withLoginFormStyles(LoginForm));


export default LoginReduxForm;