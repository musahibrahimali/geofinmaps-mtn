import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {
    CheckBox,
    DatePicker,
    DropDown, Form,
    FormButton,
    InputField,
    RadioControls, UseForm
} from "../../widgets/FormControls/controls";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {IconButton, InputAdornment} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CallIcon from "@material-ui/icons/Call";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import {getDepartmentCollection} from "../../Services/EmployeeService";
import {MakeReportFormStyles} from './MakeReportFormStyles';
import Box from "@material-ui/core/Box";
import {CopyRight} from "../../widgets/globalWidgets";
import {useStateValue} from "../../../provider/AppState";
import {useRouter} from "next/router";

const initialValues = {
    id: 0,
    fullName: '',
    emailAddress: '',
    location: '',
    description: '',
    level: 'danger',
    title : '',
    reportDate: new Date(),
};

function MakeReportForm(props) {

    const styles = MakeReportFormStyles();

    const threatLevels = [
        { id: "danger", title: "Danger" },
        { id: "warning", title: "Warning" },
        { id: "normal", title: "Normal" },
    ];

    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [dispatch] = useStateValue();
    const router = useRouter();

    const handlePasswordVisible = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    /* handle confirm password visible */
    const handleConfirmPasswordVisible = (event) => {
        event.preventDefault();
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This Field is Required";
        }
        if ('emailAddress' in fieldValues) {
            temp.emailAddress = (/$^|.+@.+..+/).test(fieldValues.emailAddress) ? "" : "Invalid Email";
        }
        if ('title' in fieldValues) {
            temp.title = fieldValues.title.length >= 8 ? "" : "This field is required)";
        }
        if ('description' in fieldValues) {
            temp.description = fieldValues.description.length >= 8 ? "" : "This field is Required";
        }
        if ('location' in fieldValues) {
            temp.location = fieldValues.location.length > 9 ? "" : "This field is required";
        }
        if ('level' in fieldValues) {
            temp.level = fieldValues.level.length !== 0 ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {

        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
        // eslint-disable-next-line no-unused-vars
        setValues,
    } = UseForm(initialValues, true, validateForm);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid className={styles.container}>
                    <Grid container>
                        <Grid item xs={6} className={styles.space}>
                            <InputField
                                required
                                label="Operator Name"
                                name="fullName"
                                placeholder="John Doe"
                                value={values.fullName}
                                onChange={handleInputChange}
                                error={errors.fullName}
                                inputIcon={<PersonOutlineOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Email Address"
                                name="emailAddress"
                                placeholder="johndoe@email.com"
                                value={values.emailAddress}
                                onChange={handleInputChange}
                                error={errors.emailAddress}
                                inputIcon={<EmailOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Report Title"
                                name="title"
                                placeholder="Cable Damage"
                                value={values.title}
                                onChange={handleInputChange}
                                error={errors.title}
                                inputIcon={<LockOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Location"
                                name="location"
                                placeholder="Adansi North"
                                value={values.location}
                                onChange={handleInputChange}
                                error={errors.location}
                                inputIcon={<LocationCityIcon color="primary" />}
                            />

                            <RadioControls
                                required
                                name="level"
                                label="Report Level"
                                color="primary"
                                value={values.level}
                                items={threatLevels}
                                onChange={handleInputChange}
                            />

                        </Grid>

                        <Grid item xs={6} className={styles.space}>

                            <DatePicker
                                required
                                name="reportDate"
                                label="Report Date"
                                value={values.reportDate}
                                onChange={handleInputChange}
                            />

                            <InputField
                                required
                                label="Description"
                                name="description"
                                placeholder="Description of the situation"
                                multiline={true}
                                maxRows={50}
                                rows={12}
                                value={values.description}
                                onChange={handleInputChange}
                            />

                        </Grid>
                    </Grid>

                    <div className="flex flex-row justify-center items-center">
                        <p className="text-red-500 dark:text-red-700">
                            {errorMessage}
                        </p>
                    </div>

                    <div className={styles.mainContainer}>
                        <FormButton
                            type="submit"
                            text="Reset"
                        />
                        <FormButton
                            variant="outlined"
                            color="secondary"
                            size="large"
                            text="Reset"
                            onClick={handleResetForm} />
                    </div>

                </Grid>

                {/* copyright phrase on bottom of sheet */}
                <Box>
                    <CopyRight/>
                </Box>
            </Form>
        </>
    );
}

export default MakeReportForm;