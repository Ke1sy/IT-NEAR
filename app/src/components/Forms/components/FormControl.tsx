import React, {FC} from "react";
import styles from './form.module.scss';
import { WrappedFieldProps } from "redux-form/lib/Field";

const inputTypes = [
    'text',
    'email',
    'checkbox',
    'password'
];

type OwnPropsType = {
    groupClasses?: string
    label?: string,
    type: string,
    rest?: any
};
type PropsType = WrappedFieldProps & OwnPropsType;

export const renderField:FC<PropsType> = ({input, groupClasses, label, type, meta: {touched, error}, ...rest}) => {
    return (
        <div
            className={touched && error ? `${styles.form__group} ${styles.error} ${groupClasses}` : `${styles.form__group} ${groupClasses}`}>
            {label &&
            <label className={styles.form__label} htmlFor={input.name}>{label}</label>
            }

            {inputTypes.includes(type) &&
            <input {...input} {...rest} type={type} className={styles.form__input}/>
            }
            {type === 'textarea' &&
            <textarea {...input} {...rest} className={styles.form__textarea}/>
            }
            {touched && (error && <span className={styles.error__text}>{error}</span>)}
        </div>
    )
};
