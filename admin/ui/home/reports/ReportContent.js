import React, {useState} from 'react';
import {AdminHomeStyles} from "../AdminHomeStyles";
import {
    ActionButton, ConfirmDialog,
    FormButton,
    InputField,
    Notification,
    PopUp,
    UseTable
} from "../../../../global/widgets/FormControls/controls";
import {
    InputAdornment,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    Toolbar
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import {useRouter} from "next/router";

function ReportContent(props) {
    const { reports } = props;
    const router = useRouter();
    const styles = AdminHomeStyles();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title:"", subTitle:""});
    const [recordsForEdit, setRecordsForEdit] = useState(null);
    const [records, setRecords] = useState(reports);
    const [filterFn, setFilterFn] = useState({
        fn: items => { return items; }
    });

    const headCells = [
        { id: "reportTitle", label: "Id Title" },
        { id: "reportType", label: "Id Level" },
        { id: "author", label: "Author" },
        { id: "location", label: "Location"},
        { id: "actions", label: "Actions", disableSorting: true },
    ];


    const {
        TableContainer,
        TableHeader,
        TablePaging,
        RecordsAfterPagingAndSorting,
    } = UseTable(records, headCells, filterFn);

    const handleSearch = (event) => {
        let target = event.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    return items;
                } else {
                    return items.filter(item => item.title.toLowerCase().includes(target.value));
                }
            }
        });
    }

    // close pop up
    const handleOpenPopUP = () => {
        setOpenPopUp(!openPopUp);
        setRecordsForEdit(null);
    }

    // add or edit entry
    const addOrEdit = (employee, handleResetForm) => {
        handleResetForm();
        setRecordsForEdit(null);
        setOpenPopUp(false);
        setRecords(null);
        setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success"
        })
    }

    // open in popup
    const openInPopUp = (item) => {
        setRecordsForEdit(item);
        setOpenPopUp(true);
    }

    const onDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure you want to delete entry",
            subTitle: "Entry deleted cannot be restored. You cant undo this operation",
            onConfirm: () => {handleDelete(id)}
        })
    }

    // handle delete operation
    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        setRecords(null);
        setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "error"
        })
    }

    const handleOnClick = (item) => {
        router.push(`/admin/reports/${item.id}`).then(() => {});
    }

    return (
        <div className="pt-24">
            <Paper elevation={0} className={styles.employeePageContent}>
                <Toolbar>
                    <InputField
                        label="Search"
                        className={styles.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    {/*<FormButton*/}
                    {/*    text="Add New"*/}
                    {/*    variant="outlined"*/}
                    {/*    startIcon={<AddIcon />}*/}
                    {/*    className={styles.newButton}*/}
                    {/*    onClick={handleOpenPopUP}*/}
                    {/*/>*/}
                </Toolbar>

                <TableContainer>
                    <TableHeader />
                    <TableBody>
                        {
                            RecordsAfterPagingAndSorting().map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.level.toUpperCase()}</TableCell>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>
                                        {/* edit */}
                                        <ActionButton
                                            color="primary"
                                            onClick={() => handleOnClick(item)}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </ActionButton>
                                        {/* delete */}
                                        <ActionButton
                                            color="secondary"
                                            onClick={
                                                () => {onDelete(item.id)}
                                            }
                                        >
                                            <CloseIcon color="disabled" fontSize="small" />
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableContainer>
                <TablePaging />
            </Paper>

            {/* pop up form */}

            <PopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                title={"Employee Form"}>
                {/*<EmployeeForm*/}
                {/*    addOrEdit={addOrEdit}*/}
                {/*    recordForEdit={recordsForEdit}*/}
                {/*/>*/}
                <div>

                </div>
            </PopUp>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* confirm dialog */}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    );
}

export default ReportContent;