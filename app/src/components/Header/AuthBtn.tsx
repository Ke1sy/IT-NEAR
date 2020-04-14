import React, {FC, useEffect} from 'react';
import {
    Avatar,
    Button, Hidden,
    Link,
    Typography, WithStyles,
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import {ProfileType} from "../../redux/reducers/types";
import Submenu from "./Submenu";
import RM from "../../RouterManager";
import withAuthBtnStyles from "./authBtnStyles";
import {ExpandMoreRoundedIcon} from "../Icons/MeterialIcons";

type PropsType = {
    login: string | null,
    isAuth: boolean,
    currentUserInfo: ProfileType | null
    userId: number | null,
    openLogoutDialog: (open: boolean) => void
}

const AuthBtn: FC<PropsType & WithStyles> = ({isAuth, login, currentUserInfo, userId, openLogoutDialog, classes}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const avatar = currentUserInfo  && currentUserInfo.photos.small ? currentUserInfo.photos.small : userPlaceholder;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        handleClose()
    }, []);

    return (
        <>
            {
                isAuth &&
                <>
                    <Button
                        className={classes.avatar}
                        color="inherit"
                        onClick={handleClick}
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                    >
                        <Avatar src={avatar} alt={login ? login : 'avatar'} sizes="40" classes={{root: classes.avatarRoot}}/>
                        <Hidden smDown>
                            <Typography variant="body2" className={classes.avatarText}>
                                {currentUserInfo && currentUserInfo.fullName ? currentUserInfo.fullName : login}
                            </Typography>
                        </Hidden>
                        <ExpandMoreRoundedIcon fontSize="small" className={`${classes.avatarIcon} ${anchorEl ? 'active': ''}`}/>
                    </Button>
                    <Submenu openLogoutDialog={openLogoutDialog} userId={userId} handleClose={handleClose} anchorEl={anchorEl}/>
                </>
            }

            {
                !isAuth &&
                <Link component={NavLink} to={RM.login.path} className={classes.loginLink}>
                    Login
                </Link>
            }

        </>
    )
};

export default withAuthBtnStyles(AuthBtn);