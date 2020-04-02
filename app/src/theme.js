import {createMuiTheme} from '@material-ui/core/styles';
import {red, grey, indigo} from '@material-ui/core/colors';

export default createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        useNextVariants: true,
        color: '#333',
        h2: {
            fontSize: '3rem'
        },
        h3: {
            fontSize: '2.5rem'
        },
        h4: {
            fontSize: '1.75rem'
        },
        subtitle1: {
            fontWeight: 500
        }

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
        },
        secondary: {
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
        },

    },
});