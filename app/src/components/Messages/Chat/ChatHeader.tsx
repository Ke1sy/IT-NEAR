import React, {FC} from 'react';
import {Avatar, Hidden, IconButton, Link, Typography, WithStyles} from "@material-ui/core";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {NavLink} from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import RM from "../../../RouterManager";
import {ProfileType} from "../../../redux/reducers/types";
import {Skeleton} from "@material-ui/lab";
import withChatHeaderStyles from "./chatHeaderStyles";

type PropsType = {
    lastUserActivityDate: string | null
    selectedFriend: ProfileType,
    messagesLoading: boolean
}

const ChatHeader: FC<PropsType  & WithStyles> = ({classes, lastUserActivityDate, selectedFriend, messagesLoading}) => {
    return (
        <div className={classes.head}>
            <Hidden mdUp>
                <IconButton
                    color="primary"
                    aria-label="Back"
                    edge="end"
                    component={NavLink}
                    className={classes.back}
                    to={RM.dialogs.getPath(null)}
                >
                    <KeyboardBackspaceIcon/>
                </IconButton>
            </Hidden>
            {
                messagesLoading ?
                    <Skeleton animation="wave" variant="circle" height={40} width={40}/> :
                    <Avatar
                        src={selectedFriend.photos.small || userPlaceholder}
                        component={NavLink}
                        to={RM.profile.getPath(selectedFriend.userId)}
                        alt='avatar'
                        sizes="40"
                    />
            }

            <div className={classes.headInfo}>
                {messagesLoading ?
                    <>
                        <Skeleton animation="wave" width="80%" className={"MuiTypography-subtitle1"}/>
                        <Skeleton animation="wave" width="50%"  height={13} className={"MuiTypography-body2"}/>
                    </>
                    :
                    <>
                        <Link component={NavLink} to={RM.profile.getPath(selectedFriend.userId)} underline="none"
                              className={classes.headLink}>
                            <Typography variant="subtitle1" component="h6">{selectedFriend.fullName}</Typography>
                        </Link>
                        {lastUserActivityDate &&
                        <div className={classes.headDate}>
                            Was here: {new Date(lastUserActivityDate).toLocaleString()}
                        </div>
                        }
                    </>
                }
            </div>
        </div>
    )
};

export default withChatHeaderStyles(ChatHeader);
