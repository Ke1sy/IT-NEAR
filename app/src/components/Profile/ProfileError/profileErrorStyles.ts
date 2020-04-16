import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    root: {
        textAlign: 'center',
        padding: '30px 0',
        flexGrow: 1,
    },
    img: {
        maxWidth: 300,
        margin: '25px 0'
    },
    error: {
        textAlign: 'left',
    }
}));

export default withStyles(styles, {withTheme: true})
