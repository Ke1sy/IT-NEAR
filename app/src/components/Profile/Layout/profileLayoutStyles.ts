import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    profile: {
        display: 'flex',
        [theme.breakpoints.down(769)]: {
            flexDirection: 'column'
        }
    },
    profileLeft: {
        width: '100%',
        minWidth: 250,
        [theme.breakpoints.up(769)]: {
            width: 250,
            minWidth: 250,
        },
        [theme.breakpoints.up('lg')]: {
            width: 300,
            minWidth: 300,
        },
    },
    profileRight: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        [theme.breakpoints.up(769)]: {
            paddingTop: 0,
            marginLeft: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(3),
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(3),
        }
    },
    grid: {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse'
        }
    }
}));

export default withStyles(styles, {withTheme: true})
