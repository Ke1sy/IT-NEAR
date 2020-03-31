import React, {FC, useEffect, useState} from 'react';
import jobImage from "../../../assets/images/job-image.png";
import {ProfileType} from "../../../redux/reducers/types";
import Paper from '@material-ui/core/Paper';
import {Box, Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import PersonAddDisabledRoundedIcon from "@material-ui/icons/PersonAddDisabledRounded";
// import classes from "./profile-info.module.scss";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ControlPointOutlinedIcon from '@material-ui/icons/ControlPointOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from "classnames";
import SettingsIcon from '@material-ui/icons/Settings';
import styles from "../../Messages/Message/message.module.scss";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    setUserStatus: (status: string) => void
}
type ContactsArrType = {
    name: string
    url: string
}

const useStyles = makeStyles(theme => ({
    content: {
        paddingTop: 25
    },

    paper: {
        backgroundColor: theme.palette.common.white,
        padding: 25,
    },

    withBg: {
        position: 'relative',
        '&:after': {
            display: 'block',
            content: '\'\'',
            background: `url(${jobImage}) no-repeat`,
            opacity: 0.5,
            top: 0,
            right: 0,
            width: 100,
            height: 100,
            position: 'absolute',
            zIndex: 2,
            backgroundSize: 100
        }
    },

    edit: {
        position: 'absolute',
        textAlign: 'right',
        right: 15,
        top: 15
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    status: {
        marginBottom: theme.spacing(2)
    },
    contacts: {},
    actions: {
        textAlign: 'right',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column'

    },

    actionsBtn: {
        marginBottom: 20,
        borderRadius: 0
    },

    block: {
        marginBottom: theme.spacing(2)
    },

    jobIcon: {
        transform: 'translateY(4px)',
        marginLeft: 5,
        '&.error': {
            color: theme.palette.error.main
        },
        '&.success': {
            color: theme.palette.success.main
        }
    }
}));

const StaticProfileInfo: FC<PropsType> = ({profile, isOwner}) => {
    // const [contactsArr, setContactsArr] = useState<Array<ContactsArrType>>([]);
    const classes = useStyles();
    const {fullName, lookingForAJobDescription, aboutMe, lookingForAJob} = profile;
    //
    // useEffect(() => {
    //     let newArr: ContactsArrType[] = [];
    //     Object.entries(profile.contacts).forEach(([key, value]) => {
    //             if (value !== null && value.length) {
    //                 newArr = [...newArr, {name: key, url: value}];
    //             }
    //         }
    //     );
    //     setContactsArr(newArr);
    // }, [profile.contacts]);

    return (
        <div className={classes.content}>
            <Grid container spacing={2}>
                <Grid item sm={8} md={9}>
                    <Typography variant="h6" className={classes.title}>Personal Info</Typography>

                    <Paper className={classNames(`${classes.paper}`, {[`${classes.withBg}`]: lookingForAJob})}>

                        {/*<div className={classes.contacts}>*/}
                        {/*    {*/}
                        {/*        contactsArr.map((item: any) =>*/}
                        {/*            <a href={item.url} key={item.name} target="_blank"*/}
                        {/*               rel="noopener noreferrer">*/}
                        {/*                {item.name}*/}
                        {/*            </a>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div className={classes.block}>
                            <Typography variant="subtitle1" component="span">Full Name: </Typography>
                            <Typography variant="body1" component="span">{fullName}</Typography>
                        </div>
                        <div className={classes.block}>
                            <Typography variant="subtitle1" component="span">About me: </Typography>
                            <Typography variant="body1" component="span">{aboutMe}</Typography>
                        </div>
                        <div className={classes.block}>
                            <Typography variant="subtitle1" component="span">Looking for a job: </Typography>
                            <Typography variant="body1" component="span">
                                {lookingForAJob ?
                                    <DoneOutlineIcon fontSize="small" className={classNames(
                                        classes.jobIcon,
                                        'success')}/> :
                                    <NotInterestedIcon fontSize="small" className={classNames(
                                        classes.jobIcon,
                                        'error'
                                    )}/>
                                }
                            </Typography>
                        </div>
                        {lookingForAJob &&
                        <div className={classes.block}>
                            <Typography variant="subtitle1" component="span">Job Description: </Typography>
                            <Typography variant="body1" component="span">
                                {lookingForAJobDescription}
                            </Typography>
                        </div>
                        }
                    </Paper>
                </Grid>
                <Grid item sm={4} md={3}>

                    <div className={classes.actions}>
                        {!isOwner &&
                        <>
                            <Button variant="contained" color="primary" className={classes.actionsBtn}
                                    startIcon={<PersonAddDisabledRoundedIcon/>}>
                                Follow
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.actionsBtn}
                                    startIcon={<EmailRoundedIcon/>}>
                                Message
                            </Button>
                        </>
                        }
                        {/*todo remove*/}
                        {isOwner &&
                        <div>
                            <Button variant="contained" color="primary" component={NavLink} className={classes.actionsBtn} to="/settings" startIcon={<SettingsIcon/>}>
                                Settings
                            </Button>
                        </div>
                        }
                    </div>
                </Grid>
            </Grid>

        </div>
    )
};

export default StaticProfileInfo;