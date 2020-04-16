import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    list: {
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 20,
        },
    },
    listItem: {
        padding: '0 8px',
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
        },
    },
    link: {
        color: theme.palette.text.primary,
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            padding: '8px 0',
            color: theme.palette.grey[600]
        },
    },
    icon: {
        padding: theme.spacing(1),
        color: theme.palette.common.white,
        lineHeight: 0,
        [theme.breakpoints.down('xs')]: {
            color: theme.palette.grey[500],
            marginRight: 5
        },
    },
    name: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.2rem'
        },
    },
    activeLink: {
        pointerEvents: 'none',
        "& .MuiIconButton-root": {
            backgroundColor: theme.palette.primary.light
        },
        '& $icon, & $name': {
            [theme.breakpoints.down('xs')]: {
                color: theme.palette.primary.light,
            },
        }
    },
    tooltip: {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default withStyles(styles, {withTheme: true})
