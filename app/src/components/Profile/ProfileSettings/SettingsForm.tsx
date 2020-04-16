import React, {useEffect, FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Preloader from "../../Preloader/Preloader";
import {required} from "../../../utils/validate";
import {RenderField} from '../../Forms/components/FormControl';
import {ProfileType, UpdatedProfileType} from "../../../redux/reducers/types";
import {Alert} from "@material-ui/lab";
import {Button, Paper, Typography, WithStyles} from '@material-ui/core';
import {CancelOutlinedIcon, CheckCircleOutlineOutlinedIcon} from "../../Icons/MeterialIcons";
import StyledDivider from "../Posts/StyledDivider";
import withSettingsFormStyles from "./settingsFormStyles";

type OwnPropsType = {
    profile: ProfileType,
}

type FormDataType = UpdatedProfileType;

type PropsType = InjectedFormProps<FormDataType> & OwnPropsType & WithStyles;

const socialsFields = ['website', 'facebook', 'vk', 'twitter', 'instagram', 'youtube', 'github'];

const SettingsForm: FC<PropsType> = ({handleSubmit, error, pristine, submitting, reset, initialize, profile, classes}) => {
    useEffect(() => {
        if (profile) {
            initForm()
        }
    }, [profile]);

    const initForm = () => {
        if (profile) {
            const {aboutMe, contacts: {facebook, website, github, instagram, youtube, twitter, vk}, lookingForAJob, lookingForAJobDescription, fullName} = profile;
            initialize({
                fullName,
                aboutMe,
                facebook,
                website,
                github,
                instagram,
                youtube,
                twitter,
                vk,
                lookingForAJob,
                lookingForAJobDescription
            });
        }
    };

    if (!profile) {
        return <Preloader showPreloader={true}/>
    }
    return (
        <form onSubmit={handleSubmit}>
                <StyledDivider customClasses={classes.divider}/>
                <Paper className={classes.paper}>
                    <Typography variant="body1" className={classes.title}>
                        Profile:
                    </Typography>
                    <Field
                        component={RenderField}
                        type="text"
                        name="fullName"
                        variant="outlined"
                        validate={required}
                        label="Full Name *"
                    />
                    <Field
                        component={RenderField}
                        type="textarea"
                        name="aboutMe"
                        multiline
                        variant="outlined"
                        label="About Me *"
                        validate={required}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="body1" className={classes.title}>
                        Contacts:
                    </Typography>
                    {socialsFields.map(item => <Field
                        component={RenderField}
                        key={item}
                        type="text"
                        name={item}
                        label={item.slice(0, 1).toUpperCase() + item.slice(1)}
                        variant="outlined"
                    />)}
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="body1" className={classes.title}>
                        Open for job proposals
                    </Typography>
                    <Field
                        component={RenderField}
                        type="switch"
                        name="lookingForAJob"
                        label="I'm looking for a job"
                        id="lookingForAJob"
                    />
                    <Field
                        component={RenderField}
                        type="textarea"
                        multiline
                        variant="outlined"
                        name="lookingForAJobDescription"
                        label="Job description *"
                        validate={required}
                    />
                </Paper>
                {error &&
                <Alert severity="error" className={classes.error}>{error}</Alert>
                }
                <div className={classes.buttons}>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleOutlineOutlinedIcon/>}
                        disabled={pristine || submitting}
                        className={classes.button}
                    >
                        Save
                    </Button>
                    <Button
                        size="large"
                        type="reset"
                        variant="contained"
                        color="secondary"
                        disabled={pristine || submitting}
                        startIcon={<CancelOutlinedIcon/>}
                        onClick={reset}
                        className={classes.button}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
    )
};

const SettingsReduxForm = reduxForm<FormDataType, OwnPropsType>({
    form: 'settings',
})(withSettingsFormStyles(SettingsForm));

export default SettingsReduxForm;
