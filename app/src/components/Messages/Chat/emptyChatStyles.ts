import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import chatPlaceholder from "../../../assets/images/chat-bg.svg";

const styles = createStyles((theme: Theme) => ({
    empty: {
        width: '100%',
        height: '100%',
        padding: 30,
        display: 'flex',
        flexDirection: 'column'
    },
    emptyImg: {
        background: `url(${chatPlaceholder}) no-repeat center` ,
        backgroundSize: 'contain',
        flexGrow: 1
    },
    emptyText: {
        margin: '30px 0',
        textAlign: 'center'
    }
}));

export default withStyles(styles, {withTheme: true})
