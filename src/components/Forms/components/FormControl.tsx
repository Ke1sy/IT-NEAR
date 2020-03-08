import React, {FC} from "react";
import styles from './form.module.scss';

const inputTypes = [
    'text',
    'email',
    'checkbox',
    'password'
];

type PropsType = {
    input : any
    groupClasses?: string
    label?: string,
    type: string,
    meta: {
        touched: boolean
        error: boolean
    },
    rest?: any
};

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
            <textarea {...input} {...rest} type={type} className={styles.form__textarea}/>
            }
            {touched && (error && <span className={styles.error__text}>{error}</span>)}
        </div>
    )
};
