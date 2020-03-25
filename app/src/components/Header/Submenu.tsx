import React, {FC} from 'react';
import {
    Divider,
    Link,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    WithStyles
} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import withSubmenuStyles from './submenuStyles'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

type PropsType = {
    logout: (history: any) => void,
    userId: number | null,
    handleClose: () => void
    anchorEl: null | HTMLElement,
    history: any,
}

const Submenu: FC<PropsType & WithStyles> = ({
                                                 logout,
                                                 userId,
                                                 handleClose,
                                                 anchorEl,
                                                 history,
                                                 classes
                                             }) => {
    return (
        <>
            <Paper>

            </Paper>
            <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={10}
                getContentAnchorEl={null}
                classes={{
                    paper: classes.paper,
                    list: classes.list
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem className={classes.menuItem}>
                    <Link component={NavLink} to={`/profile/${userId}`} className={classes.link}>
                        <ListItemIcon>
                            <PersonRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText  classes={{
                            primary: classes.menuItemTxt
                        }} primary="Profile"/>
                    </Link>
                </MenuItem>
                <Divider orientation="horizontal" light={true}/>
                <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                        <EditRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText  classes={{
                        primary: classes.menuItemTxt
                    }} primary="Edit Profile"/>
                </MenuItem>
                <Divider orientation="horizontal" light={true}/>

                <MenuItem className={classes.menuItem} onClick={() => logout(history)}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText  classes={{
                        primary: classes.menuItemTxt
                    }} primary="Logout"/>
                </MenuItem>
            </Menu>
        </>
    )
};

export default withSubmenuStyles(Submenu);