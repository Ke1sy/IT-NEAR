import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        padding: '20px 25px 5px',
        backgroundColor: theme.palette.common.white,
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: 20,
        fontWeight: 500
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '25px 0 15px',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center',
        },
    },
    error: {
        marginBottom: 15
    },
    button: {
        minWidth: '48%',
        marginLeft: 15,
        [theme.breakpoints.up('sm')]: {
            minWidth: 200
        },
        '&:first-of-type': {
            marginLeft: 0
        },
    },
    divider: {
        position: 'relative',
        top: 4
    }
}));

export default withStyles(styles, {withTheme: true})
