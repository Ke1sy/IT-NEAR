import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    cover: {
        height: 200,
        objectFit: 'cover',
        overflow: 'hidden',
    },
}));

export default withStyles(styles, {withTheme: true})