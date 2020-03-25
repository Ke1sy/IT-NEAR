import { createMuiTheme } from '@material-ui/core/styles';
import {red,blue, indigo} from '@material-ui/core/colors';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
        color: '#333',
    },
    mixins: {
        toolbar: {
            minHeight: 48
        }
    },
    palette: {
        type: 'light',
        primary: {
            main: '#3d4977'
            // main: '#3f51b5'
        },
        secondary: {
            main: '#5383ff',
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
        contrastText: '#fff',
        text: {
            primary: '#333',
            // secondary: string
        }
    },
});