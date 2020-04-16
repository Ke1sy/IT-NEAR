import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        backgroundColor: theme.palette.common.white,
        width: '100%'
    },
    emptyText: {
        padding: 25
    }
}));

export default withStyles(styles, {withTheme: true})
