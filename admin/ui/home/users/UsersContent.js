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
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import {useRouter} from "next/router";

function UsersContent(props) {
    const { users } = props;
    const router = useRouter();
    const styles = AdminHomeStyles();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title:"", subTitle:""});
    const [recordsForEdit, setRecordsForEdit] = useState(null);
    const [records, setRecords] = useState(users);
    const [filterFn, setFilterFn] = useState({
        fn: items => { return items; }
    });

    const headCells = [
        { id: "fullName", label: "Employee Name" },
        { id: "emailAddress", label: "Employee Email" },
        { id: "role", label: "Employee Role" },
        { id: "department", label: "Employee Department"},
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

    const handleUserClick = (userName) => {
        router.push(`/admin/operators/${userName}`).then(() => {});
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

    return (
        <div className="pt-24 h-screen">
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
                    <FormButton
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={styles.newButton}
                        onClick={handleOpenPopUP}
                    />
                </Toolbar>

                <TableContainer>
                    <TableHeader />
                    <TableBody>
                        {
                            RecordsAfterPagingAndSorting().map((item) => (
                                <TableRow key={item.emailAddress}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.emailAddress}</TableCell>
                                    <TableCell>{item.phoneNumber}</TableCell>
                                    <TableCell>{item.departmentId}</TableCell>
                                    <TableCell>
                                        {/* edit */}
                                        <ActionButton
                                            color="primary"
                                            onClick={() => {
                                                handleUserClick(item.fullName);
                                            }}>
                                            <RecentActorsIcon color="action" fontSize="small" />
                                        </ActionButton>
                                        {/* delete */}
                                        <ActionButton
                                            color="secondary"
                                            onClick={
                                                () => {onDelete(item)}
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

export default UsersContent;