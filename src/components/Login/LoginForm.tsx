import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {renderField} from "../Forms/components/FormControl";
import {required, email, minLength} from "../../utils/validate";
import styles from './login-form.module.scss';

const minLength5 = minLength(5);

type OwnPropsType = {
    captchaUrl?: string | null
}

type PropsType = InjectedFormProps & OwnPropsType;

const LoginForm: FC<PropsType> = ({handleSubmit, pristine, submitting, reset, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Field
                component={renderField}
                type="email"
                name="email"
                label="Email:"
                required={true}
                validate={[required, email]}
            />
            <Field
                component={renderField}
                type="password"
                name="password"
                label="Password:"
                required={true}
                validate={[required, minLength5]}
            />

            <Field
                groupClasses={styles.form__group_inline}
                name="rememberMe"
                id="rememberMe"
                component={renderField}
                type="checkbox"
                label={"Remember me"}
            />

            {captchaUrl &&
            <>
                <img src={captchaUrl} alt=""/>
                <Field
                    name="captcha"
                    component={renderField}
                    type="text"
                    label={"Type the symbols from image above: "}
                    validate={[required]}
                />
            </>
            }
            {error && <div className={styles.form__error}>{error}</div>}

            <div className={styles.form__btns}>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
};


const LoginReduxForm = reduxForm<{}, OwnPropsType>({
    form: 'login'
})(LoginForm);


export default LoginReduxForm;