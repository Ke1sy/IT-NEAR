import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import logoImg from '../../assets/images/logo.png';
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    IconButton,
    Grid,
    Container,
    Divider
} from '@material-ui/core';
import Navbar from "./Navbar";
import {ProfileType} from "../../redux/reducers/types";
import AuthBtn from "./AuthBtn";
import RM from "../../RouterManager";


type PropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean,
    logout: (history: any) => void
    history: any,
    newMessagesCount: number | null
    currentUserInfo: ProfileType | null
}

const useStyles = makeStyles((theme) => ({
        grid: {
            display: 'flex',
        },

        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            color: theme.palette.common.white,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            lineHeight: 1
        },
        logoImg: {
            height: 35
        },
        logoutBtn: {
            padding: theme.spacing(1),
        },
        logoTxt: {
            padding: theme.spacing(1),
            color: theme.palette.common.white,
            fontWeight: 300
        },
        rightColumn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%'
        },
        avatar: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            textTransform: 'none'
        },

        avatarText: {
            padding: '0 5px'
        }
    }));

const Header: FC<PropsType> = ({userId, login, logout, isAuth, history, newMessagesCount, currentUserInfo}) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" component="header" className={classes.appBar}>
            <Container maxWidth="lg">
                <Toolbar variant="dense" disableGutters>
                    <Grid container className={classes.grid} spacing={0}>
                        <Grid item sm={6}>
                            <div className={classes.logo}>
                                <NavLink to={RM.home.path} >
                                        <img src={logoImg} alt="" className={classes.logoImg}/>
                                </NavLink>
                            </div>
                        </Grid>
                        <Grid item sm={6}>
                            <div className={classes.rightColumn}>
                                <Navbar newMessagesCount={newMessagesCount}/>
                                <Divider orientation="vertical" flexItem light={true}/>
                                <AuthBtn login={login} history={history} isAuth={isAuth}
                                         currentUserInfo={currentUserInfo} userId={userId} logout={logout}/>
                                <Divider orientation="vertical" flexItem light={true}/>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;