import { createMuiTheme } from '@material-ui/core/styles';
import {red, grey, indigo} from '@material-ui/core/colors';

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
            // main: '#3f5377'
            main: '#3d4977'
        },
        secondary: {
            // main: '#5383ff',
            main: '#ab003c',
        },
        grey: grey,
        success: {
            main: '#00B294',
        },
        background: '#f5f5f5',
        error: {
            main: '#E81123'
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        contrastText: '#fff',
        text: {
            primary: '#333',
            // secondary: string
        },

    },
});