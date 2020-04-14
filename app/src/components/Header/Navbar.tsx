import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import RM from "../../RouterManager";
import classNames from "classnames";
import {MailIcon, PeopleAltIcon, HomeIcon, SettingsIcon, ExitToAppIcon} from "../Icons/MeterialIcons";
import {
    List,
    ListItem,
    Link,
    IconButton,
    Tooltip,
    Badge, Hidden, Typography, WithStyles,
} from "@material-ui/core";
import withNavbarStyles from "./navbarStyles";

type PropsType = {
    newMessagesCount: null | number,
    userId: number | null,
    openLogoutDialog: (open: boolean) => void,
    isAuth: boolean
};

const Navbar: FC<PropsType & WithStyles> = ({newMessagesCount, userId, openLogoutDialog, isAuth, classes}) => {
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
        },
        {
            id: 5,
            text: 'Logout',
            url: null,
            icon: <ExitToAppIcon/>
        }
    ];

    let areNewMessages = newMessagesCount && newMessagesCount > 0;

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
                {MOBILE_LINKS.map(({id, text, url, icon}) => {
                        if (id == 5 && !isAuth) return null;
                        return (
                            <ListItem key={id} className={classes.listItem}>
                                <Link component={url ? NavLink : 'span'}
                                      {...url ? {
                                          to: url,
                                          activeClassName: classes.activeLink
                                      } : ''}
                                      {...id === 5 ? {onClick: () => openLogoutDialog(true)} : ''}
                                      className={classes.link}
                                      underline="none"
                                      color="textSecondary"
                                >
                                    <Typography variant="body1" component="span"
                                                className={classNames('MuiListItemIcon-root', classes.icon)}>
                                        {url === RM.dialogs.getPath(null) && areNewMessages ?
                                            <Badge color="secondary" variant="dot">
                                                {icon}
                                            </Badge> : icon
                                        }
                                    </Typography>
                                    <Typography variant="body1" component="span" className={classes.name}>
                                        {text}
                                    </Typography>
                                </Link>
                            </ListItem>
                        )
                    }
                )}
            </Hidden>
        </List>
    )
};


export default withNavbarStyles(Navbar);