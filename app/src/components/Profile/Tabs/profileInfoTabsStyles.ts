import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    tab: {
        fontWeight: 400,
        textTransform: 'none',
        minWidth: 'auto',
        color: theme.palette.primary.light,
        '&:not($selected):hover': {
            color: theme.palette.primary.main
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: 90,
        }
    },
    selected: {
        color: theme.palette.secondary.main,
        cursor: 'auto'
    },
    indicator: {
        backgroundColor: 'transparent'
    },
}));

export default withStyles(styles, {withTheme: true})
