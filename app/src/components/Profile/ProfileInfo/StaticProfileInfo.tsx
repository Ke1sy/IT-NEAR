import React, {FC} from 'react';
import jobImage from "../../../assets/images/job-image.png";
import {ProfileType} from "../../../redux/reducers/types";
import Paper from '@material-ui/core/Paper';
import {makeStyles, Typography} from "@material-ui/core";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import classNames from "classnames";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
}

const useStyles = makeStyles(theme => ({
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
            backgroundSize: 100,
            borderTopRightRadius: 4
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
    }
}));

const StaticProfileInfo: FC<PropsType> = ({profile, isOwner}) => {
    const classes = useStyles();
    const {fullName, lookingForAJobDescription, aboutMe, lookingForAJob} = profile;
    return (
            <Paper className={classNames(`${classes.paper}`, {[`${classes.withBg}`]: lookingForAJob})}>
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
    )
};

export default StaticProfileInfo;