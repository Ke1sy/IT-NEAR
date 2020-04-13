import React, {FC, useEffect, useState} from 'react';
import {Button, makeStyles} from "@material-ui/core";
import classNames from "classnames";
import PersonAddDisabledRoundedIcon from "@material-ui/icons/PersonAddDisabledRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import {useHistory} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {getFollowInProgress} from "../../redux/reducers/users-selectors";
import {connect} from "react-redux";
import {follow, unfollow} from "../../redux/reducers/users-reducer";
import {startChat} from "../../redux/reducers/dialogs-reducer";
import {Skeleton} from "@material-ui/lab";

type OwnPropsType = {
    userId: number,
    isLoading: boolean,
    followed: boolean,
    updateProfileFollowed?: boolean,
    customClasses?: {
        btn?: string,
        label?: string,
        text?: string
    }
};

type MapStatePropsType = {
    followInProgress: Array<number>,
}

type MapDispatchPropsType = {
    startChat: (userId: number, history: any) => void
    follow: (id: number, updateProfileFollow: boolean) => void
    unfollow: (id: number, updateProfileFollow: boolean) => void
}

const useStyles = makeStyles(theme => ({
    btnFollow: {
        background: theme.palette.success.main,
        '&:hover': {
            background: theme.palette.success.dark,
        },
        '&.active': {
            background: theme.palette.secondary.main,
        }
    },

}));

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

const FollowMessageBtns: FC<PropsType> = ({userId, followed, followInProgress, unfollow, follow, startChat, isLoading, updateProfileFollowed = false, customClasses}) => {
    let history = useHistory();
    const classes = useStyles();
    const labelClasses = customClasses && customClasses.label ? customClasses.label : undefined;
    const textClasses = customClasses && customClasses.text ? customClasses.text : undefined;
    const btnClasses = customClasses && customClasses.btn ? customClasses.btn : undefined;

    if (isLoading) {
        return (
            <>
                <Skeleton animation="wave" height={36} className={btnClasses}/>
                <Skeleton animation="wave" height={36} className={btnClasses}/>
            </>
        )
    }
    return (
        <>
            <Button
                disabled={followInProgress.includes(userId)}
                variant="contained"
                color="primary"
                classes={{
                    label: labelClasses,
                    root: classNames(classes.btnFollow, {'active': followed}, btnClasses),
                    text: textClasses,
                }}
                startIcon={followed ? <PersonAddDisabledRoundedIcon/> : <PersonAddRoundedIcon/>}
                onClick={followed ?
                    () => unfollow(userId, updateProfileFollowed) :
                    () => follow(userId, updateProfileFollowed)}>
                <span className={textClasses}>
                     {followed ? "Unfollow" : "Follow"}
                </span>
            </Button>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    label: labelClasses,
                    root: btnClasses,
                    text: textClasses,
                }}
                startIcon={<EmailRoundedIcon/>}
                disabled={followInProgress.includes(userId)}
                onClick={() => startChat(userId, history)}>
                    <span className={textClasses}>
                        Message
                    </span>
            </Button>
        </>
    )
};

let mapStateToProps = (state: AppStateType) => {
    return {
        followInProgress: getFollowInProgress(state),
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    unfollow,
    follow,
    startChat,
})(FollowMessageBtns);
