import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
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
        right: 10,
        [theme.breakpoints.up(769)]: {
            right: 2,
        }
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
    },
    withNewMessages: {
        paddingRight: 35,
        [theme.breakpoints.up(769)]: {
            paddingRight: 25
        }
    }
}));

export default withStyles(styles, {withTheme: true})
