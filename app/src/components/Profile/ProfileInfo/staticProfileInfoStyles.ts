import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import jobImage from "../../../assets/images/job-image.png";

const styles = createStyles((theme: Theme) => ({
    paper: {
        backgroundColor: theme.palette.common.white,
        padding: 25,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        marginBottom: 20
    },

    withBg: {
        position: 'relative',
        '&:after': {
            display: 'block',
            content: '\'\'',
            background: `url(${jobImage}) no-repeat`,
            opacity: 0.5,
            top: 0,
            right: 0,
            width: 100,
            height: 100,
            position: 'absolute',
            backgroundSize: 100,
        }
    },

    edit: {
        position: 'absolute',
        textAlign: 'right',
        right: 15,
        top: 15
    },
    status: {
        marginBottom: theme.spacing(2)
    },
    contacts: {},

    block: {
        marginBottom: theme.spacing(2)
    },

    jobIcon: {
        transform: 'translateY(4px)',
        marginLeft: 5,
        '&.error': {
            color: theme.palette.error.main
        },
        '&.success': {
            color: theme.palette.success.main
        }
    },
    divider: {
        position: 'relative',
        top: 4,
        zIndex: 2
    }
}));

export default withStyles(styles, {withTheme: true})
