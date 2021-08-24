import React from 'react';
import {Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {PopUpStyles} from "./PopUpStyles";
import {ActionButton} from "../controls";

const PopUp = (props) => {

    const styles = PopUpStyles();

    const {title, children, openPopUp, setOpenPopUp} = props;

    const handleClosePopUp = () => {
        setOpenPopUp(false);
    }

    return (
        <Dialog maxWidth="md" open={openPopUp} classes={{paper: styles.dialogWrapper}}>
            <DialogTitle>
                <div className={styles.titleContainer}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <ActionButton
                        color="secondary"
                        onClick={handleClosePopUp}
                    >
                        <CloseIcon />
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default PopUp;
