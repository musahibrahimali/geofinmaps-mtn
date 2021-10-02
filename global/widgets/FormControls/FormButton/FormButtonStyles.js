import { makeStyles } from "@material-ui/core";

export const FormButtonStyles = makeStyles(
    theme => ({
        root: {
            margin: theme.spacing(1),
        },
        label: {
            textTransform: "none",
        }
    })
);