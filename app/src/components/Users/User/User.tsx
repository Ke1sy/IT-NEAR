import React, {FC} from 'react';
import userPlaceholder from '../../../assets/images/user-placeholder.png';
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/reducers/types";
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PersonAddDisabledRoundedIcon from '@material-ui/icons/PersonAddDisabledRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import classNames from 'classnames';
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Link,
    Typography,
    CardActions,
    makeStyles
} from '@material-ui/core';
import RM from "../../../RouterManager";
import {Skeleton} from "@material-ui/lab";

type PropsType = {
    user: UserType,
    followInProgress: Array<number>,
    history: any,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    startChat: (userId: number, history: any) => void,
    isLoading: boolean
};

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.common.white,
        paddingTop: 20,
        borderRadius: 0,
        textAlign: 'center',
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    avatarImg: {
        height: 100,
        width: 100,
        margin: '0 auto'
    },
    content: {
        padding: '15px 20px',
        flexGrow: 1
    },

    buttons: {
        padding: '0 20px 25px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 320,
        margin: '0 auto'
    },
    btn: {
        width: '48%',
        maxWidth: '48%'
    },
    btnFollow: {
        background: theme.palette.success.main,
        '&:hover': {
            background: theme.palette.success.dark,
        },
        '&.active': {
            background: theme.palette.secondary.main,
        }
    },
    btnLabel: {
        fontSize: 14,
    },
    bottom: {
        marginTop: 'auto',
        borderTop: '1px solid ' + theme.palette.grey[200],
    },

    bottomLink: {
        display: 'block',
        width: '100%',
        padding: '1rem 0',
        color: theme.palette.secondary.light
    },
    autoMargin: {
        margin: '0 auto'
    },
    noHover: {
        pointerEvents: 'none'
    }
}));

const User: FC<PropsType> = ({unfollow, follow, user, followInProgress, startChat, history, isLoading}) => {
    const classes = useStyles();
    const {id, photos, name, status, followed} = user;
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;
    return (
        <Card className={classes.root}>
            <Link component={NavLink} to={RM.profile.getPath(id)} underline="none">
                {
                    isLoading ?
                        <Skeleton animation="wave" variant="circle" width={100} height={100}
                                  className={classes.avatarImg}/> :
                        <Avatar src={userAvatar} alt={name ? name : 'avatar'} className={classes.avatarImg}
                                component="span"/>
                }
            </Link>
            <CardContent className={classes.content}>
                {isLoading ? (
                    <>
                        <Skeleton animation="wave" width="85%" className={classNames(classes.autoMargin, "MuiTypography-h5")}/>
                        <Skeleton animation="wave" width="60%" className={classNames(classes.autoMargin, "MuiTypography-body2")}/>
                    </>
                    )
                   : (
                        <>
                            <Typography gutterBottom variant="h5" component="div" noWrap>
                                {name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" noWrap>
                                {status}
                            </Typography>
                        </>
                    )
                }
            </CardContent>

            <CardActions className={classes.buttons}>
                {isLoading ? (
                        <>
                            <Skeleton animation="wave" height={36} className={classes.btn}/>
                            <Skeleton animation="wave" height={36} className={classes.btn}/>
                        </>
                    )
                    : (
                        <>
                            <Button
                                disabled={followInProgress.includes(id)}
                                variant="contained"
                                color="primary"
                                classes={{
                                    label: classes.btnLabel,
                                    root: classNames(classes.btn, classes.btnFollow, {'active': followed}),
                                }}
                                startIcon={followed ? <PersonAddDisabledRoundedIcon/> : <PersonAddRoundedIcon/>}
                                onClick={followed ?
                                    () => unfollow(id) :
                                    () => follow(id)}>
                                {followed ? "Unfollow" : "Follow"}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                classes={{
                                    label: classes.btnLabel,
                                    root: classes.btn
                                }}
                                startIcon={<EmailRoundedIcon/>}
                                disabled={followInProgress.includes(id)}
                                onClick={() => startChat(id, history)}>
                                Message
                            </Button>
                        </>
                    )
                }
            </CardActions>
            <CardActionArea className={classNames(classes.bottom, {[classes.noHover]: isLoading})}>
                {isLoading ? (
                        <div className={classes.bottomLink}>
                            <Skeleton animation="wave" width='50%' className={classNames(classes.autoMargin, "MuiTypography-body2")}/>
                        </div>
                    )
                    : (
                        <Link component={NavLink} to={RM.profile.getPath(id)} className={classes.bottomLink} underline="none">
                            <Typography variant="body1" component="span">
                                View Profile
                            </Typography>
                        </Link>
                    )
                }
            </CardActionArea>
        </Card>
    )
};

export default User;
