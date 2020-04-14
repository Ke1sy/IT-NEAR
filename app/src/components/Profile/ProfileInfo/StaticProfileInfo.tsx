import React, {FC} from 'react';
import classNames from "classnames";
import {ProfileType} from "../../../redux/reducers/types";
import {Typography, WithStyles, Paper} from "@material-ui/core";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import {Skeleton} from "@material-ui/lab";
import StyledDivider from "../Posts/StyledDivider";
import withStaticProfileStyles from "./staticProfileInfoStyles";

type PropsType = {
    profile: ProfileType,
    profileIsLoading: boolean
}

const StaticProfileInfo: FC<PropsType & WithStyles> = ({profile: {fullName, lookingForAJobDescription, aboutMe, lookingForAJob}, profileIsLoading, classes}) => {
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

export default withStaticProfileStyles(StaticProfileInfo);