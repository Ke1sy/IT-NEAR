import React, {FC} from 'react';
import jobImage from "../../../assets/images/job-image.png";
import {ProfileType} from "../../../redux/reducers/types";
import Paper from '@material-ui/core/Paper';
import {makeStyles, Typography} from "@material-ui/core";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import classNames from "classnames";
import StyledDivider from "../Posts/StyledDivider";
import {Skeleton} from "@material-ui/lab";

type PropsType = {
    profile: ProfileType,
    profileIsLoading: boolean
}

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
        padding: 25,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
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
            backgroundSize: 100,
        }
    },

    edit: {
        position: 'absolute',
        textAlign: 'right',
        right: 15,
        top: 15
    },
    status: {
        marginBottom: theme.spacing(2)
    },
    contacts: {},

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
    },
    divider: {
        position: 'relative',
        top: 4,
        zIndex: 2
    }
}));

const StaticProfileInfo: FC<PropsType> = ({profile: {fullName, lookingForAJobDescription, aboutMe, lookingForAJob}, profileIsLoading}) => {
    const classes = useStyles();
    const blocks = [
        {id: 1, title: 'Full Name: ', text: fullName},
        {id: 2, title: 'About me:  ', text: aboutMe},
        {id: 3, title: 'Looking for a job:  ', text: lookingForAJob ?
                <DoneOutlineIcon fontSize="small" className={classNames(classes.jobIcon, 'success')}/> :
                <NotInterestedIcon fontSize="small" className={classNames(classes.jobIcon, 'error')}/>
        },
        {id: 4, title: 'Job Description: ', text: lookingForAJobDescription},
    ];

    return (
        <>
            <StyledDivider customClasses={classes.divider}/>
            <Paper className={classNames(`${classes.paper}`, {[`${classes.withBg}`]: lookingForAJob && !profileIsLoading})}>
                {blocks.map(({id, title, text}) => {
                    if (!text) {
                        return null
                    }
                    return (
                        <div className={classes.block} key={id}>
                            {profileIsLoading ?
                                <Skeleton animation="wave" width="100%" className="MuiTypography-subtitle1"/> :
                                <>
                                    <Typography variant="subtitle1" component="span">{title}</Typography>
                                    <Typography variant="body1" component="span">{text}</Typography>
                                </>
                            }
                        </div>
                    )
                })}
            </Paper>
        </>
    )
};

export default StaticProfileInfo;