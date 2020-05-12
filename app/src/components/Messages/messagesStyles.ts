import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            padding: '20px 0',
        }
    },
    paper: {
        width: '100%',
        height: 'calc(100vh - 130px)',
        display: 'flex',
        background: '#ffffff',
        borderRadius: 0,
        position: 'relative'
    },
    list: {
        borderRight: '1px solid #eeeeee',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '100%',
        padding: 0,
        [theme.breakpoints.down(769)]: {
            background: 'rgba(255, 255, 255, 0.8)',
            position: 'absolute',
            left: 0,
            width: '100%',
            top: 0,
            bottom: 0,
            zIndex: 2
        },
        [theme.breakpoints.up(769)]: {
            width: 250,
            minWidth: 250,
        },
        [theme.breakpoints.up('md')]: {
            width: 300,
            minWidth: 300,
        },
    },
    hiddenList: {
        [theme.breakpoints.down(769)]: {
            left: 'calc(-100% - 30px)',
        },
    },
    content: {
        flexGrow: 1,
        position: 'relative',
        maxWidth: '100%'
    }
}));

export default withStyles(styles, {withTheme: true})
