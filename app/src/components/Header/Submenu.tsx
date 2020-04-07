import React, {FC} from 'react';
import {
    Divider,
    Link,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper, Typography,
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
                <MenuItem component={NavLink} to={`/profile/${userId}`} className={classes.menuItem}>
                    <span className="MuiListItemIcon-root">
                        <PersonRoundedIcon fontSize="small" />
                    </span>
                    <Typography variant="body1" component="span" className={classes.menuItemTxt}>Profile</Typography>
                </MenuItem>
                <Divider orientation="horizontal" light={true}/>
                <MenuItem component={NavLink} to={`/settings`} className={classes.menuItem}>
                     <span className="MuiListItemIcon-root">
                        <EditRoundedIcon fontSize="small" />
                    </span>
                    <Typography variant="body1" component="span" className={classes.menuItemTxt}>Edit Profile</Typography>
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