import React, {FC} from 'react';
import {
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    WithStyles
} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import withSubmenuStyles from './submenuStyles'
import RM from "../../RouterManager";
import classNames from "classnames";
import {EditRoundedIcon, PersonRoundedIcon, ExitToAppIcon} from "../Icons/MeterialIcons";

type PropsType = {
    userId: number | null,
    handleClose: () => void
    anchorEl: null | HTMLElement,
    openLogoutDialog: (open: boolean) => void
}

const Submenu: FC<PropsType & WithStyles> = ({userId, handleClose, anchorEl, classes, openLogoutDialog}) => {
    return (
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
            <MenuItem component={NavLink} to={RM.profile.getPath(userId)} className={classes.menuItem} onClick={() => handleClose()}>
                    <span className={classNames('MuiListItemIcon-root', classes.menuIcon)}>
                        <PersonRoundedIcon fontSize="small"/>
                    </span>
                <Typography variant="body1" component="span" className={classes.menuItemTxt}>Profile</Typography>
            </MenuItem>
            <Divider orientation="horizontal" light={true}/>
            <MenuItem component={NavLink} to={RM.settings.path} className={classes.menuItem} onClick={() => handleClose()}>
                     <span className={classNames('MuiListItemIcon-root', classes.menuIcon)}>
                        <EditRoundedIcon fontSize="small"/>
                    </span>
                <Typography variant="body1" component="span" className={classes.menuItemTxt}>Edit Profile</Typography>
            </MenuItem>
            <Divider orientation="horizontal" light={true}/>

            <MenuItem className={classes.menuItem} onClick={() => {openLogoutDialog(true); handleClose()}}>
                <ListItemIcon className={classes.menuIcon}>
                    <ExitToAppIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.menuItemTxt}} primary="Logout"/>
            </MenuItem>
        </Menu>
    )
};

export default withSubmenuStyles(Submenu);