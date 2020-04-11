import React, {FC} from 'react';
import {
    makeStyles,
    SwipeableDrawer,
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {NavLink} from "react-router-dom";
import RM from "../../RouterManager";
import logoImg from "../../assets/images/logo.png";

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    menuButton: {
        marginRight: 0,
        padding: theme.spacing(1)
    },
    paper: {
        backgroundColor: theme.palette.common.white
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        backgroundColor: theme.palette.primary.main,
        height: 49,
    },
    headImg: {
        height: 30
    },
}));

const MobileMenu:FC = ({children}) => {
    const classes = useStyles();
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

export default MobileMenu;