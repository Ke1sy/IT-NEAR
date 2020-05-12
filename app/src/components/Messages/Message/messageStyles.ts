import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    message: {
        marginBottom: 25,
        fontSize: 16,
        fontWeight: 400,
        position: "relative",
        maxWidth: "80%",
        display: "flex",
        alignItems: "flex-end",
        [theme.breakpoints.up('sm')]: {
            marginBottom: 30,
        },
    },

    avatar: {
        height: 40,
        width: 40
    },

    messageSended: {
        alignSelf: "flex-end",
        paddingLeft: 22,
        flexDirection: "row-reverse",
        '& $messageItem': {
            background: "#3d4977",
            color: "#fff",
            borderBottomRightRadius: 0
        },
        '& $avatar': {
            marginLeft: 10
        },
        '& $viewedIcon': {
            right: 55
        },
        '& $actionBtn': {
            left: 0
        },
        '& $date': {
            right: 50
        }
    },

    messageRecieved: {
        paddingRight: 22,
        '& $messageItem': {
            background: "#efefef",
            borderBottomLeftRadius: 0
        },
        '& $avatar': {
            marginRight: 10
        },
        '& $viewedIcon': {
            left: 55,
            filter: "invert(0.5)"
        },
        '& $actionBtn': {
            right: 0
        },
        '& $date': {
            left: 50
        }
    },

    messageInactive: {
        '& $messageItem': {
            background: "#eee",
            color: "grey",
            fontSize: "12px"
        },
        '& $viewedIcon': {
            display: "none"
        }
    },

    messageItem: {
        fontSize: "0.9rem",
        padding: "9px 15px",
        borderRadius: "10px",
        wordBreak: 'break-word'
    },

    viewedIcon: {
        position: "absolute",
        bottom: "2px",
        height: "12px",
    },

    messageIcon: {
        maxWidth: 17,
        maxHeight: 17,
        opacity: "0.5"
    },

    actionBtn: {
        cursor: "pointer",
        width: 20,
        height: 20,
        position: "absolute",
        background: "transparent",
        padding: 2,
        boxSizing: "border-box",
        border: "none",
        display: "flex",
        alignItems: "center",
        '&:hover $messageIcon': {
            opacity: 1
        },
    },

    delete: {
        top: 0
    },

    restore: {
        top: 0,
        bottom: 0,
        margin: "auto 0"
    },

    spam: {
        top: 20
    },

    date: {
        position: "absolute",
        bottom: "-20px",
        fontSize: 11,
        color: theme.palette.grey[400],
        letterSpacing: "-0.4px",
        whiteSpace: "nowrap",
        [theme.breakpoints.up(480)]: {
            fontSize: 12,
        },
    }
}));

export default withStyles(styles, {withTheme: true})