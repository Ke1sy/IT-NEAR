import React, {FC} from 'react';
import {Button, Hidden, makeStyles} from "@material-ui/core";
import PersonAddDisabledRoundedIcon from "@material-ui/icons/PersonAddDisabledRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import {NavLink, useLocation} from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import RM from "../../../RouterManager";
import {Skeleton} from "@material-ui/lab";
import FollowMessageBtns from "../../Buttons/FollowMessageBtns";

type PropsType = {
    isOwner: boolean,
    profileIsLoading: boolean,
    userId: number,
    followed: boolean
}

const useStyles = makeStyles(theme => ({
    actions: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        [theme.breakpoints.down(769)]: {
            maxWidth: 250,
            margin: '0 auto'
        },
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
    },
    actionsTxt: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },

    actionsBtn: {
        margin: '0 5px 20px',
        width: '45%',

        '&:last-of-type': {
            marginRight: 0
        },
        [theme.breakpoints.up(769)]: {
            width: '40%',
        },

        [theme.breakpoints.down('md')]: {
            borderRadius: 0,
            '& .MuiButton-startIcon': {
                margin: 0
            }
        },

        [theme.breakpoints.up('lg')]: {
            width: '100%',
            margin: '0 0 20px',
        }
    },
}));

const ProfileActions: FC<PropsType> = ({isOwner, profileIsLoading, userId, followed}) => {
    const classes = useStyles();
    let {pathname} = useLocation();

    return (
        <div className={classes.actions}>
            {!isOwner &&
            // (profileIsLoading ?
            //        <>
            //             <Skeleton animation="wave" height={39} className={classes.actionsBtn}/>
            //             <Skeleton animation="wave" height={39} className={classes.actionsBtn}/>
            //         </> :
            //        <>
            //             {/*todo follow / unfollow*/}
            //
            //             <Button variant="contained" color="primary" className={classes.actionsBtn}
            //                     startIcon={<PersonAddDisabledRoundedIcon/>}>
            //                 <span className={classes.actionsTxt}>Follow</span>
            //             </Button>
            //             <Button variant="contained" color="secondary" className={classes.actionsBtn}
            //                     startIcon={<EmailRoundedIcon/>}>
            //                 <span className={classes.actionsTxt}>Message</span>
            //             </Button>
            //         </>
            // )
            <FollowMessageBtns
                isLoading={profileIsLoading}
                userId={userId}
                followed={followed}
                updateProfileFollowed={true}
                customClasses={{
                    btn: classes.actionsBtn,
                    text: classes.actionsTxt
                }}
            />
            }
            {isOwner &&
            <Hidden mdDown>
               { profileIsLoading ?
                <>
                    <Skeleton animation="wave" height={45} className={classes.actionsBtn}/>
                </> :
                <>
                    {pathname === '/settings' ?
                        <Button
                            size="large"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            component={NavLink}
                            className={classes.actionsBtn}
                            to={RM.profile.getPath(null)}
                            startIcon={<AccountCircleIcon/>}
                        >
                            <span className={classes.actionsTxt}>Profile</span>
                        </Button>
                        : <Button
                            size="large"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            component={NavLink}
                            className={classes.actionsBtn}
                            to={RM.settings.path}
                            startIcon={<SettingsIcon/>}
                        >
                            <span className={classes.actionsTxt}>Settings</span>
                        </Button>
                    }
                </>
               }
            </Hidden>
            }
        </div>
    )
};

export default ProfileActions;
