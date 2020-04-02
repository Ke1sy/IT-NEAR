import React, {useEffect, FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Preloader from "../../Preloader/Preloader";
import {required} from "../../../utils/validate";
import {RenderField} from '../../Forms/components/FormControl';
import {ProfileType, UpdatedProfileType} from "../../../redux/reducers/types";
import {Alert} from "@material-ui/lab";
import {Button, makeStyles, Paper, Typography} from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import StyledDivider from "../Posts/StyledDivider";

type OwnPropsType = {
    profile: ProfileType,
}

type FormDataType = UpdatedProfileType;

type PropsType = InjectedFormProps<FormDataType> & OwnPropsType;

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '20px 25px 5px',
        backgroundColor: theme.palette.common.white,
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: 20,
        fontWeight: 500
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        margin: '25px 0 15px'
    },
    error: {
        marginBottom: 15
    },
    button: {
        minWidth: 150,
        marginLeft: 15,
        [theme.breakpoints.up('sm')]: {
            minWidth: 200
        },
        '&:first-of-type': {
            marginLeft: 0
        },
    },
    divider: {
        position: 'relative',
        top: 4
    }
}));

const socialsFields = ['website', 'facebook', 'vk', 'twitter', 'instagram', 'youtube', 'github'];

const SettingsForm: FC<PropsType> = ({handleSubmit, error, pristine, submitting, reset, initialize, profile}) => {
    const classes = useStyles();
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
        <div>
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
                        variant="outlined"
                        name="lookingForAJobDescription"
                        label="Job description"
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
        </div>
    )
};

const SettingsReduxForm = reduxForm<FormDataType, OwnPropsType>({
    form: 'settings',
})(SettingsForm);

export default SettingsReduxForm;
