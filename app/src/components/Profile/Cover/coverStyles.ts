import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    cover: {
        lineHeight: 1
    },
}));

export default withStyles(styles, {withTheme: true})