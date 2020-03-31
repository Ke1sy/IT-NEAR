import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        borderRadius: 0,
        paddingBottom: 30,
        backgroundColor: theme.palette.common.white
    },
    body: {
        textAlign: 'center'
    },
    avatar: {

    },
    avatarImg: {
        marginBottom: '-100px',
        height: 200,
        width: 200,
        border: '3px solid #fff',
        margin: '0 auto',
        position: 'relative',
        top:' -100px'
    },
}));

export default withStyles(styles, {withTheme: true})