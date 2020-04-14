import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    avatar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        textTransform: 'none',
    },
    avatarRoot: {
        marginRight: 10
    },
    loginLink: {
        paddingLeft: 20,
        paddingRight: 20,
        color: theme.palette.common.white
    },

    avatarText: {
        padding: '0 5px'
    },

    avatarIcon: {
        '&.active': {
            transform: 'rotate(180deg)',
            transition: '0.1s linear'
        }
    }
}));

export default withStyles(styles, {withTheme: true})
