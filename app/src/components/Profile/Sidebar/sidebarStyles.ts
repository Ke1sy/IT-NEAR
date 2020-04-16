import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        borderRadius: 0,
        backgroundColor: theme.palette.common.white,
        marginBottom: 20
    },
    body: {
        textAlign: 'center',
        paddingBottom: 10,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 20,
        },
    },
    avatar: {
        position: 'relative',
        top: ' -100px',
        marginBottom: '-90px',
        height: 206,
        width: 206,
        border: '3px solid #fff',
        margin: '0 auto',
        borderRadius: ' 50%',
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('xs')]: {
            height: 156,
            width: 156,
        },
    },
    avatarBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        border: `2px solid ${theme.palette.primary.main}`,
        zIndex: 2,
        padding: 8,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        transition: 'border-color  150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            borderColor: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        }
    },
    removeBtn: {
        top: 50,
        right: 0,
        transform: 'translateX(50%)'
    },
    avatarImg: {
        height: '100%',
        width: '100%',
    },
    socials: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
    },
    socialsItem: {
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            padding: 9,
            marginBottom: 5
        },
    },
    socialsIcon: {
        height: 25,
        width: 25,
        marginRight: 0,
        [theme.breakpoints.up('lg')]: {
            marginRight: 20,
        },

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
    socialsText: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block'
        }
    },
    autoMargin: {
        margin: '0 auto'
    },
}));

export default withStyles(styles, {withTheme: true})