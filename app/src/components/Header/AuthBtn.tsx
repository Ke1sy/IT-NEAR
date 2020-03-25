import React, {FC} from 'react';
import {
    Avatar,
    Button,
    Link, makeStyles,
    Typography,
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import {PhotosType} from "../../redux/reducers/types";
import Submenu from "./Submenu";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

type PropsType = {
    login: string | null,
    isAuth: boolean,
    logout: (history: any) => void,
    avatar: PhotosType | null,
    userId: number | null,
    history: any,
}

const useStyles = makeStyles(() => ({
    avatar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        textTransform: 'none'
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


const AuthBtn: FC<PropsType> = ({isAuth, login, logout, avatar, userId, history}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const userAvatar = avatar !== null && avatar.small !== null ? avatar.small : userPlaceholder;

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
                        <Avatar src={userAvatar} alt={login ? login : 'avatar'} sizes="40"/>
                        <Typography variant="body2" className={classes.avatarText}>
                            {login}
                        </Typography>
                        <ExpandMoreRoundedIcon fontSize="small" className={`${classes.avatarIcon} ${anchorEl ? 'active': ''}`}/>
                    </Button>
                    <Submenu logout={logout} userId={userId} history={history} handleClose={handleClose} anchorEl={anchorEl}/>
                </>
            }

            {
                !isAuth &&
                <Link component={NavLink} to="/login">
                    Login
                </Link>
            }

        </>
    )
};

export default AuthBtn;