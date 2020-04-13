import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import {DialogsType} from "../../../redux/reducers/types";
import {Avatar, Hidden, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import RM from "../../../RouterManager";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

type PropsType = {
    user: DialogsType
}

const useStyles = makeStyles(theme => ({
    dialog: {
        '&:not(:last-of-type)': {
            borderBottom: `1px solid ${theme.palette.grey[200]}`
        }
    },
    active: {
        background: "#efefef"
    },
    newMessages: {
        background: theme.palette.secondary.main,
        color: theme.palette.common.white,
        height: 20,
        display: "flex",
        padding: "0 6px",
        zIndex: 1,
        position: "absolute",
        flexWrap: "wrap",
        fontSize: 11,
        minWidth: 20,
        boxSizing: "border-box",
        alignItems: "center",
        fontWeight: 500,
        lineHeight: 1,
        alignContent: "center",
        borderRadius: 10,
        flexDirection: "row",
        right: 5
    },
    date: {
        fontSize: 12,
        color: theme.palette.grey[400]
    },
    openIcon: {
        transform: 'scale(-1)',
        color: theme.palette.primary.light,
        width: 21,
        [theme.breakpoints.up(769)]: {
            display: 'none',
        },
    }
}));


const Dialog: FC<PropsType> = ({user: {id, userName, photos, hasNewMessages, newMessagesCount, lastDialogActivityDate}}) => {
    const lastMessageDate = new Date(lastDialogActivityDate).toLocaleDateString();
    const classes = useStyles();
    const userAvatar = photos.small !== null ? photos.small : userPlaceholder;

    return (
        <ListItem button={true} component={NavLink} to={RM.dialogs.getPath(id)} activeClassName={classes.active}
                  className={classes.dialog}>
            <ListItemAvatar>
                <Avatar src={userAvatar} alt={userName} sizes="40"/>
            </ListItemAvatar>
            <ListItemText primary={'@' + userName} secondary={lastMessageDate} primaryTypographyProps={{noWrap: true}}
                          classes={{
                              secondary: classes.date
                          }}/>
            {hasNewMessages &&
            <span className={classes.newMessages}> {newMessagesCount > 99 ? '99+' : newMessagesCount}</span>}
            <Hidden mdUp>
                <KeyboardBackspaceIcon className={classes.openIcon}/>
            </Hidden>
        </ListItem>
    )
};


export default Dialog;
