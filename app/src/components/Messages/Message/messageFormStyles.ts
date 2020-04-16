import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    form: {
        display: "flex",
        backgroundColor: "#f3f5f7",
        padding: 10,
        [theme.breakpoints.up(769)]: {
            padding: 30,
        },
    },
    root: {
        flexGrow: 1,
        marginBottom: 0
    },
    textarea: {
        borderRadius: 0,
        backgroundColor: 'white',
        [theme.breakpoints.down(769)]: {
            padding: '10px 14px'
        },
    },
    button: {
        height: "100%",
        borderRadius: 0
    }
}));

export default withStyles(styles, {withTheme: true})