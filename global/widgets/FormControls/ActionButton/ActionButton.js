import React from 'react';
import {Button} from "@mui/material";
import {ActionButtonStyles} from "./ActionButtonStyles";

const ActionButton = (props) => {
    const styles = ActionButtonStyles();
    const {color, children, onClick} = props;

    return (
        <Button className={`${styles.root}  ${styles[color]}`} onClick={onClick}>
            {children}
        </Button>
    );
};

export default ActionButton;