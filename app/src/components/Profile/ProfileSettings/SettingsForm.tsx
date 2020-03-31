import React, {useEffect, FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from "./settings-form.module.scss";
import Preloader from "../../Preloader/Preloader";
import {required} from "../../../utils/validate";
import { RenderField } from '../../Forms/components/FormControl';
import {ProfileType, UpdatedProfileType} from "../../../redux/reducers/types";

type OwnPropsType = {
    profile: ProfileType,
}

type FormDataType = UpdatedProfileType;

type PropsType = InjectedFormProps<FormDataType> & OwnPropsType;

const SettingsForm: FC<PropsType> = ({handleSubmit, error, pristine, submitting, reset, initialize, profile}) => {

    useEffect(() => {
        const initForm = () => {
            if (profile) {
                const {aboutMe, contacts: {facebook, github, instagram, twitter, vk}, lookingForAJob, lookingForAJobDescription, fullName} = profile;

                initialize({
                    fullName,
                    aboutMe,
                    facebook,
                    github,
                    instagram,
                    twitter,
                    vk,
                    lookingForAJob,
                    lookingForAJobDescription
                });
            }
        };

        if (profile) {
            initForm()
        }
    }, [profile, initialize]);


    if (!profile) {
        return <Preloader showPreloader={true}/>
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Field
                component={RenderField}
                type="text"
                name="fullName"
                label="Full Name: "
                groupClasses={styles.form__group_inline}
            />
            <Field
                component={RenderField}
                type="textarea"
                name="aboutMe"
                label="About Me: "
                groupClasses={styles.form__group_inline}
                validate={required}
            />
            <Field
                component={RenderField}
                type="text"
                name="facebook"
                label="Facebook: "
                groupClasses={styles.form__group_inline}
            />
            <Field
                component={RenderField}
                type="text"
                name="github"
                label="Github: "
                groupClasses={styles.form__group_inline}
            />
            <Field
                component={RenderField}
                type="text"
                name="instagram"
                label="Instagram: "
                groupClasses={styles.form__group_inline}
            />
            <Field
                component={RenderField}
                type="text"
                name="twitter"
                label="Twitter: "
                groupClasses={styles.form__group_inline}
            />
            <Field
                component={RenderField}
                type="text"
                name="vk"
                label="Vkontakte: "
                groupClasses={styles.form__group_inline}
            />
            <Field
                component={RenderField}
                type="checkbox"
                name="lookingForAJob"
                label="I'm looking for a job: "
                id="lookingForAJob"
                groupClasses={`${styles.form__group_inline} ${styles.form__group_checkbox}`}
            />
            <Field
                component={RenderField}
                type="text"
                name="lookingForAJobDescription"
                label="Job description: "
                groupClasses={styles.form__group_inline}
            />

            {error && <div className={styles.form__error}>{error}</div>}

            <div className={styles.form__btns}>
                <button type="submit" disabled={pristine || submitting}>Save</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Cancel
                </button>
            </div>
        </form>
    )
};

const SettingsReduxForm = reduxForm<FormDataType, OwnPropsType>({
    form: 'settings',
})(SettingsForm);

export default SettingsReduxForm;
