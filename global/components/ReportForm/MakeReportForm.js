import React, {useEffect, useState} from 'react';
import {
    Grid,
    Box
} from "@material-ui/core";
import {
    DatePicker,
    Form,
    FormButton,
    InputField, Notification,
    RadioControls, UseForm
} from "../../widgets/FormControls/controls";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import {MakeReportFormStyles} from './MakeReportFormStyles';
import {CopyRight} from "../../widgets/globalWidgets";
import {useStateValue} from "../../../provider/AppState";
import firebase from 'firebase';

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

    const threatLevels = [
        { id: "danger", title: "Danger" },
        { id: "warning", title: "Warning" },
        { id: "normal", title: "Normal" },
    ];
    
    const { lat, lng, handleOpenPopUp } = props;
    const styles = MakeReportFormStyles();

    const [{user}] = useStateValue();
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});
    // notify user of successful log in or log out
    const notifyUser = () => {
        setNotify({
            isOpen: true,
            message: "report submitted Successfully",
            type: "success"
        });
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
            temp.title = fieldValues.title.length >= 8 ? "" : "Title must be at least 8 characters";
        }
        if ('description' in fieldValues) {
            temp.description = fieldValues.description.length >= 50 ? "" : "description must be at least 20 words";
        }
        if ('location' in fieldValues) {
            temp.location = fieldValues.location ? "" : "This field is required";
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

    const AddReport = (values) => {
        const data = {
            id: user.uid.toString() + lat.toString() + lng.toString(),
            userUID: user.uid,
            fullName: values.fullName,
            emailAddress: values.emailAddress,
            location: values.location,
            description: values.description,
            level: values.level,
            title : values.title,
            reportDate: values.reportDate,
            coord: {
                lat: lat,
                lng: lng,
            }
        }
        const addReport = firebase.functions().httpsCallable('addReport');
        addReport(data).then(() => {
            notifyUser();
        });

        handleOpenPopUp();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            AddReport(values);
            // handleResetForm();
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

    useEffect(() => {
        firebase.firestore().collection("users").doc(user.uid).get().then((response) => {
            values.fullName = response.data().fullName;
        });
        values.emailAddress = user.email;
        setValues(values);
    },[user.email, user.uid, values]);

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
                                inputIcon={<PersonOutlineIcon color="primary" />}
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
                                label="Id Title"
                                name="title"
                                placeholder="Cable Damage"
                                value={values.title}
                                onChange={handleInputChange}
                                error={errors.title}
                                inputIcon={<LockOpenOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Location"
                                name="location"
                                placeholder="Adansi North"
                                value={values.location}
                                onChange={handleInputChange}
                                error={errors.location}
                                inputIcon={<LocationCityOutlinedIcon color="primary" />}
                            />

                            <RadioControls
                                required
                                name="level"
                                label="Id Level"
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
                                label="Id Date"
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
                                error={errors.description}
                                onChange={handleInputChange}
                            />

                        </Grid>
                    </Grid>

                    <div className={styles.mainContainer}>
                        <FormButton
                            type="submit"
                            text="Id"
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

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default MakeReportForm;