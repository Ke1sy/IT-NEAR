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
import theme from "../../../theme";

type PropsType = {
    user: UserType,
    followInProgress: Array<number>,
    history: any,

    follow: (id: number) => void,
    unfollow: (id: number) => void,
    startChat: (userId: number, history: any) => void,
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
        padding: '15px 20px'
    },

    buttons: {
        padding: '15px 0',
        display: 'flex',
        justifyContent: 'space-between',
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
        fontWeight: 400
    },
    bottom: {
        marginTop: 'auto',
        borderTop: '1px solid ' + theme.palette.grey[200],
    },

    bottomLink: {
        display: 'block',
        width: '100%',
        padding: '15px 0',
        color: theme.palette.secondary.light
    }
}));

const User: FC<PropsType> = ({unfollow, follow, user, followInProgress, startChat, history}) => {
    const classes = useStyles();
    const {id, photos, name, status, followed} = user;
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;
    return (
        <Card className={classes.root}>
            <Avatar src={userAvatar} alt={name ? name : 'avatar'} className={classes.avatarImg}/>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {status}
                </Typography>
            </CardContent>

            <CardActions className={classes.buttons}>
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
            </CardActions>
            <CardActionArea className={classes.bottom}>
                <Link component={NavLink} to={`/profile/${id}`} className={classes.bottomLink} underline="none">
                    <Typography variant="body2" component="span">
                        View Profile
                    </Typography>
                </Link>
            </CardActionArea>
        </Card>
    )
};

export default User;
