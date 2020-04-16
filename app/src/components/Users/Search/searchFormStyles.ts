import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    root: {
        margin: '15px 0 25px',
        padding: '2px 20px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        position: 'relative',
        minHeight: 80,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 40,
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: theme.palette.primary.main
    },
    iconButton: {
        marginRight: 10,
        padding: 10,
        color: theme.palette.primary.main
    },
}));

export default withStyles(styles, {withTheme: true})
