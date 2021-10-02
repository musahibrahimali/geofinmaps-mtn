import {makeStyles} from "@material-ui/core";

export const LayoutStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper__shadow: {
        boxShadow: "none",
        borderRadius: "0",
    },
    main: {
        paddingLeft: "60px",
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50]: theme.palette.grey[900],
    },
}));