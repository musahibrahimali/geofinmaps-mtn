import { makeStyles } from "@material-ui/core";

export const FormStyles = makeStyles(
    theme => ({
        root: {
            "& .MuiFormControl-root": {
                width: "100%",
                margin: theme.spacing(1),
            }
        }
    })
);