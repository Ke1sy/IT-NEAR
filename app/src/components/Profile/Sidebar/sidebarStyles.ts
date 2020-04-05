import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import {} from '@material-ui/core/colors';

const styles = createStyles((theme: Theme) => ({
    paper: {
        borderRadius: 0,
        backgroundColor: theme.palette.common.white
    },
    body: {
        textAlign: 'center',
        paddingBottom: 20,
    },
    avatar: {
        position: 'relative',
        top: ' -100px',
        marginBottom: '-90px',
        height: 206,
        width: 206,
        border: '3px solid #fff',
        margin: '0 auto',
        borderRadius: ' 50%'
    },
    avatarBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        border: `2px solid ${theme.palette.primary.main}`,
        zIndex: 2,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        transition: 'border-color  150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            borderColor: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        }
    },
    avatarIcon: {
    },
    avatarImg: {
        height: '100%',
        width: '100%',
    },
    socialsIcon: {
        height: 25,
        width: 25,
        marginRight: 20,

        '&.facebook': {
            color: '#3b5999'
        },

        '&.twitter': {
            color: '#55acee'
        },

        '&.instagram': {
            color: '#e4405f'
        },

        '&.youtube': {
            color: '#cd201f'
        },

        '&.github': {
            color: '#000'
        },

        '&.website': {
            color: '#0077b5'
        }
    },
}));

export default withStyles(styles, {withTheme: true})