import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    textInput: {
        marginBottom: 25,
        '& .MuiFormHelperText-root': {
            fontSize: 10,
            position: 'absolute',
            bottom: 0,
            transform: 'translateY(100%)',
            [theme.breakpoints.up('sm')]: {
                fontSize: 12,
            }
        }
    }
}));

export default withStyles(styles, {withTheme: true})
