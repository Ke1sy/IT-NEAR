import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    actions: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        [theme.breakpoints.down(769)]: {
            maxWidth: 250,
            margin: '0 auto'
        },
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }
    },
    actionsTxt: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },

    actionsBtn: {
        margin: '0 5px 20px',
        width: '45%',

        '&:last-of-type': {
            marginRight: 0
        },
        [theme.breakpoints.up(769)]: {
            width: '40%',
        },

        [theme.breakpoints.down('md')]: {
            borderRadius: 0,
            '& .MuiButton-startIcon': {
                margin: 0
            }
        },

        [theme.breakpoints.up('lg')]: {
            width: '100%',
            margin: '0 0 20px',
        }
    },
}));

export default withStyles(styles, {withTheme: true})
