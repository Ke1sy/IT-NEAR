import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    cover: {
        lineHeight: 1,
        paddingTop: 200/1232*100 + '%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 130
    },
}));

export default withStyles(styles, {withTheme: true})