import React from 'react';
import {Button} from "@material-ui/core";
import {ActionButtonStyles} from "./ActionButtonStyles";

const ActionButton = (props) => {
    const styles = ActionButtonStyles();
    const {color, children, onClick, disabled} = props;

    return (
        <Button
            disabled={disabled || false}
            className={`${styles.root}  ${styles[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    );
};

export default ActionButton;