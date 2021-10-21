import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@material-ui/core";
import {FormButton} from "../controls";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import {ConfirmDialogStyles} from "./ConfirmDialogStyles";

const ConfirmDialog = (props) => {

    const styles = ConfirmDialogStyles();
    const {confirmDialog, setConfirmDialog} = props;

    return (
        <Dialog classes={{paper: styles.dialog}} open={confirmDialog.isOpen}>
            <DialogTitle className={styles.dialogTitle}>
                <IconButton className={styles.titleIcon} disableRipple>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={styles.dialogAction}>
                <FormButton
                    text="No"
                    color="primary"
                    variant="outlined"
                    onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}
                />
                <FormButton
                    text="Yes"
                    color="secondary"
                    variant="outlined"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;