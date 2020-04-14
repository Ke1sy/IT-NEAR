import React, {FC} from 'react';
import {SwipeableDrawer, IconButton, WithStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {NavLink} from "react-router-dom";
import RM from "../../RouterManager";
import logoImg from "../../assets/images/logo.png";
import withMobileMenuStyles from "./mobileMenuStyles";

const MobileMenu:FC<WithStyles> = ({children, classes}) => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent,) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpen(open)
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="end"
                className={classes.menuButton}
            >
                {open ? <CloseRoundedIcon fontSize="large"/> : <MenuIcon fontSize="large"/>}
            </IconButton>

            <SwipeableDrawer
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                anchor="left"
                classes={{
                    paper: classes.paper
                }}
            >
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <NavLink to={RM.home.path} className={classes.head}>
                        <img src={logoImg} alt="" className={classes.headImg}/>
                    </NavLink>
                    {children}
                </div>
            </SwipeableDrawer>
        </>
    )
};

export default withMobileMenuStyles(MobileMenu);