import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    root: {
        margin: '40px 0',
        "& .Mui-selected": {
            pointerEvents: 'none'
        },
        "& .MuiPagination-ul": {
            justifyContent: 'center'
        }
    },
}));

export default withStyles(styles, {withTheme: true})
