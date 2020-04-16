import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        padding: '30px 25px',
        backgroundColor: theme.palette.common.white,
        marginBottom: 20
    },
    form: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1,
        marginBottom: 0,
    },
    button: {
        marginLeft: 10
    },
    buttonIcon: {
        fontSize: '1.7rem'
    }
}));

export default withStyles(styles, {withTheme: true})
