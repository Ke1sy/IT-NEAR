import React, {FC} from 'react';
import {Button, Divider, isWidthUp, makeStyles, WithWidth} from "@material-ui/core";
import PersonAddDisabledRoundedIcon from "@material-ui/icons/PersonAddDisabledRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import {NavLink, useLocation} from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import RM from "../../../RouterManager";
import withWidth from '@material-ui/core/withWidth';

type PropsType = {
    isOwner: boolean
}

const useStyles = makeStyles(theme => ({
    actions: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        [theme.breakpoints.down(769)]: {
           alignItems: 'center'
        },
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
    },
    actionsTxt: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },

    actionsBtn: {
        margin: '0 5px 20px',
        '&:last-of-type': {
            marginRight: 0
        },
        [theme.breakpoints.up(769)]: {
            width: '100%',
        },
        [theme.breakpoints.down('md')]: {
            borderRadius: 0,
            width: '40%',
            '& .MuiButton-startIcon': {
                margin: 0
            }
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 0 20px',
        }
    },
}));

const ProfileActions: FC<PropsType & WithWidth> = ({isOwner, width}) => {
    const classes = useStyles();
    let { pathname } = useLocation();
    const fullWidth = ['xl'].includes(width);

    return (
        <div className={classes.actions}>
            {!isOwner &&
            <>
                <Button variant="contained" color="primary" className={classes.actionsBtn}
                        startIcon={<PersonAddDisabledRoundedIcon/>}>
                    <span className={classes.actionsTxt}>Follow</span>
                </Button>
                <Button variant="contained" color="secondary" className={classes.actionsBtn}
                        startIcon={<EmailRoundedIcon/>}>
                    <span className={classes.actionsTxt}>Message</span>
                </Button>
            </>
            }
            {isOwner &&  isWidthUp('lg', width) &&
            <>
                {pathname === '/settings' ?
                    <Button
                        size="large"
                        fullWidth={fullWidth}
                        variant="contained"
                        color="primary"
                        component={NavLink}
                        className={classes.actionsBtn}
                        to={RM.profile.getPath(null)}
                        startIcon={<AccountCircleIcon/>}
                    >
                        <span className={classes.actionsTxt}>Profile</span>
                    </Button>
                    : <Button
                        size="large"
                        fullWidth={fullWidth}
                        variant="contained"
                        color="primary"
                        component={NavLink}
                        className={classes.actionsBtn}
                        to={RM.settings.path}
                        startIcon={<SettingsIcon/>}
                    >
                        <span  className={classes.actionsTxt}>Settings</span>
                    </Button>
                }
            </>
            }
        </div>
    )
};

export default withWidth()(ProfileActions);
