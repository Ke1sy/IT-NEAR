import React, {FC, useEffect} from 'react';
import {
    Avatar,
    Button,
    Link, makeStyles,
    Typography,
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import {ProfileType} from "../../redux/reducers/types";
import Submenu from "./Submenu";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

type PropsType = {
    login: string | null,
    isAuth: boolean,
    logout: (history: any) => void,
    currentUserInfo: ProfileType | null
    userId: number | null,
    history: any,
}

const useStyles = makeStyles(theme => ({
    avatar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        textTransform: 'none'
    },
    loginLink: {
        paddingLeft: 20,
        paddingRight: 20,
        color: theme.palette.common.white
    },

    avatarText: {
        padding: '0 5px'
    },

    avatarIcon: {
      '&.active': {
          transform: 'rotate(180deg)',
          transition: '0.1s linear'
      }
    }
}));


const AuthBtn: FC<PropsType> = ({isAuth, login, logout, currentUserInfo, userId, history}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const avatar = currentUserInfo  && currentUserInfo.photos.small ? currentUserInfo.photos.small : userPlaceholder;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        {/*todo update after new photo loaded*/}
                        <Avatar src={avatar} alt={login ? login : 'avatar'} sizes="40"/>
                        <Typography variant="body2" className={classes.avatarText}>
                            {currentUserInfo && currentUserInfo.fullName ? currentUserInfo.fullName : login}
                        </Typography>
                        <ExpandMoreRoundedIcon fontSize="small" className={`${classes.avatarIcon} ${anchorEl ? 'active': ''}`}/>
                    </Button>
                    <Submenu logout={logout} userId={userId} history={history} handleClose={handleClose} anchorEl={anchorEl}/>
                </>
            }

            {
                !isAuth &&
                <Link component={NavLink} to="/login" className={classes.loginLink}>
                    Login
                </Link>
            }

        </>
    )
};

export default AuthBtn;