import React from "react";
import {Field, reduxForm} from 'redux-form'
import styles from './login-form.module.scss';
import {renderField} from "../Forms/components/FormControl";
import {required, email, minLength} from "../../utils/validate";
const minLength5 = minLength(5);

const LoginForm = ({handleSubmit, pristine, submitting, reset, error}) => {

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


const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);


export default LoginReduxForm;