import React, {FC} from 'react';
import {Avatar, Hidden, IconButton, Link, makeStyles, Typography} from "@material-ui/core";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {NavLink} from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import RM from "../../../RouterManager";
import {ProfileType} from "../../../redux/reducers/types";
import {Skeleton} from "@material-ui/lab";

type PropsType = {
    lastUserActivityDate: string | null
    selectedFriend: ProfileType,
    messagesLoading: boolean
}

const useStyles = makeStyles(theme => ({
    head: {
        display: "flex",
        alignItems: "center",
        fontSize: "12px",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: '5px 30px 5px 47px',
        zIndex: 2,
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.up(769)]: {
            padding: "11px 30px",
        },
        "&::after": {
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            content: "''",
            height: "1px",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)"
        }
    },
    headInfo: {
        marginLeft: 15,
        flexGrow: 1
    },
    headLink: {
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    headDate: {
        color: theme.palette.grey[400],
        [theme.breakpoints.down(480)]: {
            fontSize: 11
        },
    },
    back: {
        position: 'absolute',
        left: 0,
        [theme.breakpoints.up(769)]: {
            display: 'none'
        },
    }
}));

const ChatHeader: FC<PropsType> = ({lastUserActivityDate, selectedFriend, messagesLoading}) => {
    const classes = useStyles();
    return (
        <div className={classes.head}>
            <Hidden mdUp>
                <IconButton
                    color="primary"
                    aria-label="Back"
                    edge="end"
                    component={NavLink}
                    className={classes.back}
                    to={RM.dialogs.getPath(null)}
                >
                    <KeyboardBackspaceIcon/>
                </IconButton>
            </Hidden>
            {
                messagesLoading ?
                    <Skeleton animation="wave" variant="circle" height={40} width={40}/> :
                    <Avatar
                        src={selectedFriend.photos.small || userPlaceholder}
                        component={NavLink}
                        to={RM.profile.getPath(selectedFriend.userId)}
                        alt='avatar'
                        sizes="40"
                    />
            }

            <div className={classes.headInfo}>
                {messagesLoading ?
                    <>
                        <Skeleton animation="wave" width="80%" className={"MuiTypography-subtitle1"}/>
                        <Skeleton animation="wave" width="50%"  height={13} className={"MuiTypography-body2"}/>
                    </>
                    :
                    <>
                        <Link component={NavLink} to={RM.profile.getPath(selectedFriend.userId)} underline="none"
                              className={classes.headLink}>
                            <Typography variant="subtitle1" component="h6">{selectedFriend.fullName}</Typography>
                        </Link>
                        {lastUserActivityDate &&
                        <div className={classes.headDate}>
                            Was here: {new Date(lastUserActivityDate).toLocaleString()}
                        </div>
                        }
                    </>
                }
            </div>
        </div>
    )
};

export default ChatHeader;
