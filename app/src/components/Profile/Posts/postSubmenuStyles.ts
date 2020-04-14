import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import {grey} from "@material-ui/core/colors";

const styles = createStyles((theme: Theme) => ({
    menuItemText: {
        paddingLeft: 10,
        color: grey[600],
    },
    menuItemIcon: {
        color: grey[600],
    },
    paper: {
        backgroundColor: theme.palette.common.white,
    }
}));

export default withStyles(styles, {withTheme: true})
