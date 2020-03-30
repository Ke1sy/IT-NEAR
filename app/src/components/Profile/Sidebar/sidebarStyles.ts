import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        borderRadius: 0,
        backgroundColor: theme.palette.common.white,
        paddingBottom: 30
    },
    head: {
        height: 100,
        backgroundColor: theme.palette.primary.main
    },
    body: {
        textAlign: 'center'
    },
    avatar: {

    },
    avatarImg: {
        marginTop: '-65px',
        height: 130,
        width: 130,
        border: '3px solid #fff',
        margin: '0 auto'
    },
    profileLeft: {
        width: 250
    }
}));

export default withStyles(styles, {withTheme: true})