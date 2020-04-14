import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    list: {
        width: 250,
    },
    menuButton: {
        marginRight: 0,
        padding: theme.spacing(1)
    },
    paper: {
        backgroundColor: theme.palette.common.white
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        backgroundColor: theme.palette.primary.main,
        height: 49,
    },
    headImg: {
        height: 30
    },
}));

export default withStyles(styles, {withTheme: true})
