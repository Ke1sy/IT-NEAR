import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    root: {
        background: theme.palette.common.white,
        paddingTop: 20,
        borderRadius: 0,
        textAlign: 'center',
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    avatarImg: {
        height: 100,
        width: 100,
        margin: '0 auto'
    },
    content: {
        padding: '15px 20px',
        flexGrow: 1
    },

    buttons: {
        padding: '0 20px 25px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 320,
        margin: '0 auto'
    },
    btnLabel: {
        fontSize: 14,
    },
    bottom: {
        marginTop: 'auto',
        borderTop: '1px solid ' + theme.palette.grey[200],
    },
    btn: {
        width: '48%',
        maxWidth: '48%'
    },
    bottomLink: {
        display: 'block',
        width: '100%',
        padding: '1rem 0',
        color: theme.palette.secondary.light
    },
    autoMargin: {
        margin: '0 auto'
    },
    noHover: {
        pointerEvents: 'none'
    }
}));

export default withStyles(styles, {withTheme: true})
