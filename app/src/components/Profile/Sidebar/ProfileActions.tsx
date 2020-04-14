import React, {FC} from 'react';
import {Button, Hidden, WithStyles} from "@material-ui/core";
import {NavLink, useLocation} from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import RM from "../../../RouterManager";
import {Skeleton} from "@material-ui/lab";
import FollowMessageBtns from "../../Buttons/FollowMessageBtns";
import withProfileActionsStyles from "./profileActionsStyles";

type PropsType = {
    isOwner: boolean,
    profileIsLoading: boolean,
    userId: number,
    followed: boolean
}

const ProfileActions: FC<PropsType & WithStyles> = ({isOwner, profileIsLoading, userId, followed, classes}) => {
    let {pathname} = useLocation();

    return (
        <div className={classes.actions}>
            {!isOwner &&
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

export default withProfileActionsStyles(ProfileActions);
