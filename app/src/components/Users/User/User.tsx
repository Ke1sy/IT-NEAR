import React, {FC} from 'react';
import userPlaceholder from '../../../assets/images/user-placeholder.png';
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/reducers/types";
import classNames from 'classnames';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Link,
    Typography,
    CardActions,
    WithStyles
} from '@material-ui/core';
import RM from "../../../RouterManager";
import {Skeleton} from "@material-ui/lab";
import FollowMessageBtns from "../../Buttons/FollowMessageBtns";
import withUserStyles from "./userStyles";

type PropsType = {
    user: UserType,
    isLoading: boolean
};

const User: FC<PropsType & WithStyles> = ({user, isLoading, classes}) => {
    const {id, photos, name, status, followed} = user;
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;
    return (
        <Card className={classes.root}>
            <Link component={NavLink} to={RM.profile.getPath(id)} underline="none">
                {
                    isLoading ?
                        <Skeleton animation="wave" variant="circle" width={100} height={100}
                                  className={classes.avatarImg}/> :
                        <Avatar src={userAvatar} alt={name ? name : 'avatar'} className={classes.avatarImg}
                                component="span"/>
                }
            </Link>
            <CardContent className={classes.content}>
                {isLoading ? (
                    <>
                        <Skeleton animation="wave" width="85%" className={classNames(classes.autoMargin, "MuiTypography-h5")}/>
                        <Skeleton animation="wave" width="60%" className={classNames(classes.autoMargin, "MuiTypography-body2")}/>
                    </>
                    )
                   : (
                        <>
                            <Typography gutterBottom variant="h5" component="div" noWrap>
                                {name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" noWrap>
                                {status}
                            </Typography>
                        </>
                    )
                }
            </CardContent>

            <CardActions className={classes.buttons}>
                <FollowMessageBtns
                    isLoading={isLoading}
                    followed={followed}
                    userId={id}
                    customClasses={{
                        label: classes.btnLabel,
                        btn: classes.btn
                    }}
                />
            </CardActions>
            <CardActionArea className={classNames(classes.bottom, {[classes.noHover]: isLoading})}>
                {isLoading ? (
                        <div className={classes.bottomLink}>
                            <Skeleton animation="wave" width='50%' className={classNames(classes.autoMargin, "MuiTypography-body2")}/>
                        </div>
                    )
                    : (
                        <Link component={NavLink} to={RM.profile.getPath(id)} className={classes.bottomLink} underline="none">
                            <Typography variant="body1" component="span">
                                View Profile
                            </Typography>
                        </Link>
                    )
                }
            </CardActionArea>
        </Card>
    )
};

export default withUserStyles(User);
