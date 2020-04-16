import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    photo: {
        position: 'relative',
        textAlign: 'center',

        '& .ReactCrop__image': {
            maxHeight: 250
        }
    },
    load: {
        display: 'block',
        width: '100%',
        backgroundColor: '#eee',
        border: `1px dashed ${theme.palette.primary.main}`,
        marginBottom: 20,
        borderRadius: 4
    },
    loadContent: {
        display: 'flex',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadInput: {
        display: 'none'
    },
    loadIcon: {
        marginRight: 10
    },
    message: {
        marginTop: 15
    }
}));

export default withStyles(styles, {withTheme: true})
