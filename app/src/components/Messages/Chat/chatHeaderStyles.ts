import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    head: {
        display: "flex",
        alignItems: "center",
        fontSize: "12px",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: '5px 30px 5px 47px',
        zIndex: 2,
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.up(769)]: {
            padding: "11px 30px",
        },
        "&::after": {
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            content: "''",
            height: "1px",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)"
        }
    },
    headInfo: {
        marginLeft: 15,
        flexGrow: 1
    },
    headLink: {
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    headDate: {
        color: theme.palette.grey[400],
        [theme.breakpoints.down(480)]: {
            fontSize: 11
        },
    },
    back: {
        position: 'absolute',
        left: 0,
        [theme.breakpoints.up(769)]: {
            display: 'none'
        },
    }
}));

export default withStyles(styles, {withTheme: true})
