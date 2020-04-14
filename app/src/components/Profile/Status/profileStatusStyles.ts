import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    statusTxt: {
        textAlign: 'center',
    },
    icon: {
        cursor: 'pointer',
        marginLeft: 5,
        opacity: 0.7,
        transform: 'translateY(4px)',

        '&:hover': {
            opacity: 1
        }
    },
    tooltip: {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default withStyles(styles, {withTheme: true})
