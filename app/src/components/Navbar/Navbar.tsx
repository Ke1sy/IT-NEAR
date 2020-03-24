import React, {ComponentType, FC} from 'react';
import {NavLink} from "react-router-dom";
import {Drawer, List, ListItem, ListItemIcon, ListItemText,  makeStyles, Link} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const LINKS = [
     {
        id: 1,
        text: 'Profile',
        url: '/profile',
        icon: <AccountCircleIcon fontSize="small"/>
    },  {
        id: 2,
        text: 'Dialogs',
        url: '/dialogs',
        icon: <MailIcon fontSize="small"/>
    }, {
        id: 3,
        text: 'Users',
        url: '/users',
        icon: <PeopleAltIcon fontSize="small"/>
    }
];

type PropsType = {
    newMessagesCount: null | number
}

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        link: {
            color: theme.palette.text.primary,
            alignItems: 'center',
            display: 'flex',
            width: '100%',
        },
        icon : {
             minWidth: 40
        },
        activeLink: {
            color: theme.palette.secondary.main,
            "& .MuiListItemIcon-root": {
                color: theme.palette.secondary.main
            }
        }
    })
);

const Navbar: FC<PropsType> = ({newMessagesCount}) => {
    const classes = useStyles();

    let notNull = newMessagesCount !== null && newMessagesCount > 0;

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}/>
            <List>
                {LINKS.map(({id, text, url, icon}) => (
                    <ListItem button key={id}>
                        <Link component={NavLink} to={url} activeClassName={classes.activeLink} className={classes.link} underline="none" color="textSecondary">
                            <ListItemIcon className={classes.icon}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                           {url === '/dialogs' && notNull && <span> ({newMessagesCount})</span>}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>

    )
};


export default Navbar;