import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {
    List,
    ListItem,
    makeStyles,
    Link,
    IconButton,
    Tooltip,
    Badge, Hidden, Typography,
} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import RM from "../../RouterManager";
import classNames from "classnames";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useHistory} from "react-router-dom";

type PropsType = {
    newMessagesCount: null | number,
    userId: number | null,
    logout: (history: any) => void
};

const useStyles = makeStyles(theme => ({
    list: {
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 20,
        },
    },
    listItem: {
        padding: '0 8px',
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
        },
    },
    link: {
        color: theme.palette.text.primary,
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            padding: '8px 0',
            color: theme.palette.grey[600]
        },
    },
    icon: {
        padding: theme.spacing(1),
        color: theme.palette.common.white,
        lineHeight: 0,
        [theme.breakpoints.down('xs')]: {
            color: theme.palette.grey[500],
        },
    },
    name: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.2rem'
        },
    },
    activeLink: {
        pointerEvents: 'none',
        "& .MuiIconButton-root": {
            backgroundColor: theme.palette.primary.light
        },
        '& $icon, & $name': {
            [theme.breakpoints.down('xs')]: {
                color: theme.palette.primary.light,
            },
        }
    },
    tooltip: {
        backgroundColor: theme.palette.primary.light,
    },
}));

const Navbar: FC<PropsType> = ({newMessagesCount, userId, logout}) => {
    const classes = useStyles();
    let history = useHistory();
    const LINKS = [
        {
            id: 1,
            text: 'Profile',
            url: RM.profile.getPath(userId),
            icon: <HomeIcon/>
        }, {
            id: 2,
            text: 'Dialogs',
            url: RM.dialogs.getPath(null),
            icon: <MailIcon/>
        }, {
            id: 3,
            text: 'Users',
            url: RM.users.path,
            icon: <PeopleAltIcon/>
        }
    ];

    const MOBILE_LINKS = [
        ...LINKS,
        {
            id: 4,
            text: 'Settings',
            url: RM.settings.path,
            icon: <SettingsIcon/>
        }, {
            id: 5,
            text: 'Logout',
            url: null,
            icon: <ExitToAppIcon/>
        }
    ];

    let areNewMessages = newMessagesCount && newMessagesCount > 0;
    const linkProps = (url: string) => ({
            to: url,
            activeClassName: classes.activeLink
    });
    const logoutProps = {
        onClick: () => logout(history)
    };

    return (
        <List className={classes.list}>
            <Hidden xsDown>
                {LINKS.map(({id, text, url, icon}) => (
                    <ListItem key={id} className={classes.listItem}>
                        <Link component={NavLink} to={url} activeClassName={classes.activeLink} className={classes.link}
                              underline="none" color="textSecondary">
                            <Tooltip title={text} aria-label={text} classes={{tooltip: classes.tooltip}}>
                                <IconButton aria-label={text} className={classes.icon}>
                                    {url === RM.dialogs.getPath(null) && areNewMessages ?
                                        <Badge badgeContent={newMessagesCount} max={99} color="secondary">
                                            {icon}
                                        </Badge> : icon
                                    }
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </ListItem>
                ))}
            </Hidden>

            <Hidden smUp>
                {MOBILE_LINKS.map(({id, text, url, icon}) => (
                    <ListItem key={id} className={classes.listItem}>
                        <Link component={url ? NavLink : 'span'}
                            {...url ? {
                                to: url,
                                activeClassName: classes.activeLink
                            } : ''}
                            {...id === 5 ? {onClick: () => logout(history)} : ''}
                            className={classes.link}
                            underline="none"
                            color="textSecondary"
                        >
                            <Typography variant="body1" component="span" className={classNames('MuiListItemIcon-root', classes.icon)}>
                                {icon}
                            </Typography>
                            <Typography variant="body1" component="span" className={classes.name}>
                                {text}
                            </Typography>
                        </Link>
                    </ListItem>
                ))}
            </Hidden>
        </List>
    )
};


export default Navbar;