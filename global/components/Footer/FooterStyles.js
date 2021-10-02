import {makeStyles} from "@material-ui/core";

export const FooterStyles = makeStyles((theme) => ({
    footer__content: {
        flexGrow: 1,
    },
    paper_shadow: {
      boxShadow: "none",
      borderRadius: "0",
    },
    paper: {
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
        color: theme.palette.text.secondary,
        boxShadow: "0 0 0 #fff",
    },
    main__footer: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
        color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    },
    bottom__bar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.type === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400]}`
    },
    tabTitle: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: theme.palette.type === "light" ? theme.palette.grey[700] : theme.palette.grey[200],
        cursor: "default",
        "&:hover": {
            color: theme.palette.type === "light" ? theme.palette.grey[600] : theme.palette.grey[400],
        }
    },
    tabItem: {
        color: theme.palette.type === "light" ? theme.palette.grey[700] : theme.palette.grey[200],
        padding: theme.spacing(0.5),
        "&:hover": {
            color: theme.palette.type === "light" ? theme.palette.grey[600] : theme.palette.grey[400],
            textDecoration: "underline",
        }
    },
}));