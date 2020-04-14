import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    notFound: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        maxHeight: '70vh'
    }
}));

export default withStyles(styles, {withTheme: true})
