import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {
    List,
    ListItem,
    makeStyles,
    Link,
    IconButton,
    Tooltip,
    Badge
} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import RM from "../../RouterManager";

const LINKS = [
    {
        id: 1,
        text: 'Profile',
        url: RM.profile.getPath(null),
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

type PropsType = {
    newMessagesCount: null | number
}

const useStyles = makeStyles((theme) => ({
        list: {
            display: 'flex',
            padding: 0,
            justifyContent: 'flex-end',
            marginRight: 20
        },
        listItem: {
            padding: '0 8px',
            width: 'auto'
        },
        link: {
            color: theme.palette.text.primary,
            alignItems: 'center',
            display: 'flex',
            width: '100%',
        },
        icon: {
            padding: theme.spacing(1),
            color: theme.palette.common.white,
        },
        activeLink: {
            "& .MuiIconButton-root": {
                backgroundColor: theme.palette.primary.light
            }
        },
        tooltip: {
            backgroundColor: theme.palette.primary.light,
        },
    })
);

const Navbar: FC<PropsType> = ({newMessagesCount}) => {
    const classes = useStyles();

    let areNewMessages = newMessagesCount && newMessagesCount > 0;

    return (
        <List className={classes.list}>
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
                        {/*todo count for new messages*/}

                    </Link>
                </ListItem>
            ))}
        </List>
    )
};


export default Navbar;