import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        backgroundColor: theme.palette.common.white,
    },
    title: {
        textAlign: 'center',
        padding: '16px 24px 8px'
    },
    buttons: {
        justifyContent: 'space-between',
        padding: '8px 24px 16px'
    },
    btn: {
        width: '48%'
    }
}));

export default withStyles(styles, {withTheme: true})
