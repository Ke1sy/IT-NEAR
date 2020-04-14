import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    form: {
        fontSize: "16px",
        maxWidth: "400px",
        margin: "20px auto",
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        width: "48%",
        padding: "14px 10px"
    },
    captcha: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        alignItems: "center",
        '& > *': {
            width: "48%",
            marginBottom: 0
        }
    },
    error: {
        marginTop: 20
    }
}));

export default withStyles(styles, {withTheme: true})
