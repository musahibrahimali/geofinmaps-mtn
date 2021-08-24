import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a appTheme instance.
const appTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default appTheme;