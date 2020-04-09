import React, {FC} from 'react';
import {Button, makeStyles} from "@material-ui/core";
import PersonAddDisabledRoundedIcon from "@material-ui/icons/PersonAddDisabledRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import {NavLink, useLocation} from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import RM from "../../../RouterManager";

type PropsType = {
    isOwner: boolean
}

const useStyles = makeStyles(theme => ({
    actions: {
        textAlign: 'right',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    actionsBtn: {
        marginBottom: 20,
    },
}));

const ProfileActions: FC<PropsType> = ({isOwner}) => {
    const classes = useStyles();
    let { pathname } = useLocation();
    return (
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
            {isOwner &&
            <>
                {pathname === '/settings' ?
                    <Button
                        size="large"
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        component={NavLink}
                        className={classes.actionsBtn}
                        to={RM.profile.getPath(null)}
                        startIcon={<AccountCircleIcon/>}
                    >
                        Profile
                    </Button>
                    : <Button
                        size="large"
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        component={NavLink}
                        className={classes.actionsBtn}
                        to={RM.settings.path}
                        startIcon={<SettingsIcon/>}
                    >
                        Settings
                    </Button>
                }
            </>
            }
        </div>
    )
};

export default ProfileActions;
