import {makeStyles} from "@material-ui/core";

export const ActionButtonStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        "& .MuiButton-label": {
            color: theme.palette.secondary.main,
        },
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        "& .MuiButton-label": {
            color: theme.palette.primary.main,
        },
    }
}));