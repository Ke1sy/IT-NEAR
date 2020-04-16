import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import {grey} from "@material-ui/core/colors";

const styles = createStyles((theme: Theme) => ({
    post: {
        backgroundColor: theme.palette.common.white,
        padding: '20px 25px 10px',
        marginBottom: 20,
        position: 'relative',
        wordBreak: 'break-word'
    },
    content: {
        padding: '20px 0'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10
    },
    likeBtn: {
        cursor: 'pointer',
        marginRight: 10,

        '&:hover': {
            '& $likeIcon': {
                color: theme.palette.secondary.main
            }
        }
    },
    isLiked: {
        '& $likeIcon': {
            color: theme.palette.secondary.main
        }
    },
    likeIcon: {
        color: grey[300],
        transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    date: {
        fontSize: 12,
        color: grey[500],
    },
    head: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
        width: 50,
        height: 50,
    },
    more: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    moreIcon: {
        transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: theme.palette.primary.light,

        ' &:hover': {
            color: theme.palette.primary.main
        }
    }
}));

export default withStyles(styles, {withTheme: true})
