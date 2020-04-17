import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },

    toolbar: theme.mixins.toolbar,
}));

export default withStyles(styles, {withTheme: true})