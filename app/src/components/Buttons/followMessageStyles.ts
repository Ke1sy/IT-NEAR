import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    btnFollow: {
        background: theme.palette.success.main,
        '&:hover': {
            background: theme.palette.success.dark,
        },
        '&.active': {
            background: theme.palette.secondary.main,
        }
    },
}));

export default withStyles(styles, {withTheme: true});