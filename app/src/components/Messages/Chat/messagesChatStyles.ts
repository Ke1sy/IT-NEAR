import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    chat: {
        position: "relative",
        paddingTop: "68px",
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },

    chatWrapper: {
        position: "relative",

        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexGrow: 1,
        overflowY: "auto",
        padding: "0 10px 20px"
    },
    date: {
        color: theme.palette.grey[400],
        margin: "5px auto",
        [theme.breakpoints.up('sm')]: {
            margin: "15px auto",
        },
    }
}));

export default withStyles(styles, {withTheme: true})
