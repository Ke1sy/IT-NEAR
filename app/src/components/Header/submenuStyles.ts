import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    paper: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    list: {
        padding: 0
    },
    link: {
        display: 'flex',
        width: '100%',
        alignItems: 'center'
    },
    menuItemTxt: {
        fontSize: '0.8rem',
        lineHeight: 1
    },
    menuItem: {
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color:  theme.palette.common.white,

            '& .MuiLink-root, & .MuiListItemIcon-root': {
                color:  theme.palette.common.white,
                textDecoration: 'none'
            }
        }
    }
}));


export default withStyles(styles, {withTheme: true})