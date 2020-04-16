import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    grid: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.common.white,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        lineHeight: 1
    },
    logoImg: {
        height: 30,
        [theme.breakpoints.up('sm')]: {
            height: 35,
        },
    },
    logoutBtn: {
        padding: theme.spacing(1),
    },
    logoTxt: {
        padding: theme.spacing(1),
        color: theme.palette.common.white,
        fontWeight: 300
    },
    rightColumn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%'
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        textTransform: 'none'
    },
    avatarText: {
        padding: '0 5px'
    }
}));

export default withStyles(styles, {withTheme: true})
