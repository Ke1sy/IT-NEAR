import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import logoImg from '../../assets/images/logo.png';
import {
    AppBar,
    Toolbar,
    Grid,
    Container,
    Divider, Hidden, WithStyles
} from '@material-ui/core';
import Navbar from "./Navbar";
import {ProfileType} from "../../redux/reducers/types";
import AuthBtn from "./AuthBtn";
import RM from "../../RouterManager";
import MobileMenu from "./MobileMenu";
import withHeaderStyles from "./headerStyles";

type PropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean,
    newMessagesCount: number | null
    currentUserInfo: ProfileType | null,
    openLogoutDialog: (open: boolean) => void
}

const Header: FC<PropsType & WithStyles> = ({userId, login, isAuth, newMessagesCount, currentUserInfo, openLogoutDialog, classes}) => {
    return (
        <AppBar position="fixed" component="header" className={classes.appBar}>
            <Container maxWidth="lg">
                <Toolbar variant="dense" disableGutters>
                    <Grid container className={classes.grid} spacing={0}>
                        <Grid item xs={6} sm={4}>
                            <div className={classes.logo}>
                                <NavLink to={RM.home.path} >
                                        <img src={logoImg} alt="" className={classes.logoImg}/>
                                </NavLink>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <div className={classes.rightColumn}>
                                <Hidden xsDown>
                                    <Navbar
                                        isAuth={isAuth}
                                        newMessagesCount={newMessagesCount}
                                        userId={currentUserInfo ? currentUserInfo.userId : null}
                                        openLogoutDialog={openLogoutDialog}
                                      />
                                    <Divider
                                        orientation="vertical"
                                        flexItem
                                        light={true}/>
                                    <AuthBtn login={login} openLogoutDialog={openLogoutDialog} isAuth={isAuth}
                                             currentUserInfo={currentUserInfo} userId={userId}/>
                                    <Divider orientation="vertical" flexItem light={true}/>
                                </Hidden>

                                <Hidden smUp>
                                    <MobileMenu>
                                        <Navbar
                                            isAuth={isAuth}
                                            openLogoutDialog={openLogoutDialog}
                                            newMessagesCount={newMessagesCount}
                                            userId={currentUserInfo ? currentUserInfo.userId : null}
                                        />
                                    </MobileMenu>
                                </Hidden>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default withHeaderStyles(Header);