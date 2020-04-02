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
    avatarImg: {
        marginBottom: '-90px',
        height: 200,
        width: 200,
        border: '3px solid #fff',
        margin: '0 auto',
        position: 'relative',
        top:' -100px'
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