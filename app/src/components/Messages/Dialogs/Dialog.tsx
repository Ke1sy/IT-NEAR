import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {DialogsType} from "../../../redux/reducers/types";
import {Avatar, Hidden, ListItem, ListItemAvatar, ListItemText, WithStyles} from "@material-ui/core";
import RM from "../../../RouterManager";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import classNames from "classnames";
import withDialogStyles from "./dialogStyles";

type PropsType = {
    user: DialogsType
}

const Dialog: FC<PropsType & WithStyles> = ({classes, user: {id, userName, photos, hasNewMessages, newMessagesCount, lastDialogActivityDate}}) => {
    const lastMessageDate = new Date(lastDialogActivityDate).toLocaleDateString();
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;

    return (
        <ListItem button={true} component={NavLink} to={RM.dialogs.getPath(id)} activeClassName={classes.active}
                  className={classNames(classes.dialog, {[classes.withNewMessages]: newMessagesCount > 0})}>
            <ListItemAvatar>
                <Avatar src={userAvatar} alt={userName} sizes="40"/>
            </ListItemAvatar>
            <ListItemText primary={'@' + userName} secondary={lastMessageDate} primaryTypographyProps={{noWrap: true}}
                          classes={{
                              secondary: classes.date
                          }}/>
            {hasNewMessages &&
                <span className={classes.newMessages}> {newMessagesCount > 99 ? '99+' : newMessagesCount}</span>
            }
            <Hidden mdUp>
                {!hasNewMessages &&
                <KeyboardBackspaceIcon className={classes.openIcon}/>
                }
            </Hidden>
        </ListItem>
    )
};

export default withDialogStyles(Dialog);
