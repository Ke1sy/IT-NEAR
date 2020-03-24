import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import logoImg from '../../assets/images/logo.png';
import classes from './header.module.scss';
import {
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    makeStyles,
    IconButton, Grid,
    Link, Button
} from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
type PropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean,
    logout: (history: any) => void
    history: any
}

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        logo: {
            display: 'flex',
            alignItems: 'center'
        },
        logoImg: {
            height: 30
        },
        logoBtn: {
            padding: theme.spacing(1),
            position: 'relative',
            left: -theme.spacing(1),
        },
        logoutBtn: {
            padding: theme.spacing(1),
            color: '#fff'
        },
        logoTxt: {
            padding: theme.spacing(1),
            color: '#fff'
        }
    })
);

const Header: FC<PropsType> = ({userId, login, logout, isAuth, history}) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" component="header" className={classes.appBar}>
            <Toolbar variant="dense">
                <Grid container justify="space-between" className={classes.root} spacing={2}>
                    <Grid item>
                        <div>
                            <NavLink to="/" className={classes.logo}>
                                <IconButton aria-label="logo" className={classes.logoBtn}>
                                    <img src={logoImg} alt="" className={classes.logoImg}/>
                                </IconButton>
                                <Typography variant="body1" className={classes.logoTxt}>Social Network</Typography>
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item>
                        {
                            isAuth &&
                            <>
                                <Link component={NavLink} to={`/profile/${userId}`} color="inherit">
                                   {login}
                                </Link>
                                <IconButton aria-label="logout" onClick={() => logout(history)} className={classes.logoutBtn}>
                                    <ExitToAppIcon color="inherit"/>
                                </IconButton>
                            </>
                        }
                      {
                          !isAuth &&
                          <Link component={NavLink} to="/login">
                              Login
                          </Link>
                      }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
};

export default Header;