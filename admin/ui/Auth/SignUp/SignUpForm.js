import React, {useState} from 'react';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {SignUpFormStyles} from "./SignUpFormStyles";
import {Container, IconButton, InputAdornment, Paper} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import CallIcon from '@material-ui/icons/call';
import LocationCityIcon from '@material-ui/icons/locationcity';
import firebase from 'firebase';

import {
    CheckBox,
    CopyRight, DatePicker,
    DropDown,
    Form,
    FormButton, getDepartmentCollection,
    InputField,
    RadioControls,
    UseForm
} from "../../../../global/global";
import {useStateValue} from "../../../../provider/AppState";
import {useRouter} from "next/router";

const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" },
];

const initialValues = {
    id: 0,
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
};

const AdminSignUpForm = () => {
    const styles = SignUpFormStyles();

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
        if ('password' in fieldValues) {
            temp.password = fieldValues.password.length >= 8 ? "" : "Invalid Password (password must be at least 8 characters)";
        }
        if ('confirmPassword' in fieldValues) {
            temp.confirmPassword = fieldValues.confirmPassword.length >= 8 ? "" : "Passwords do not match";
        }
        if ('phoneNumber' in fieldValues) {
            temp.phoneNumber = fieldValues.phoneNumber.length > 9 ? "" : "Invalid Phone Number";
        }
        if ('departmentId' in fieldValues) {
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleSignUP = async (event) => {
        event.preventDefault();
        await firebase.auth()
            .createUserWithEmailAndPassword(
                values.emailAddress, values.password
            )
            .then((auth) => {
                if (auth) {
                    firebase.firestore().collection('admins').add({
                        userName: values.fullName,
                        userEmail: values.emailAddress,
                        phone: values.phoneNumber,
                        gender: values.gender,
                        city: values.city,
                        isPermanent: values.isPermanent,
                        department: values.departmentId,
                        isAdmin: true,
                    });
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: auth,
                    });
                    router.replace('/');
                }
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorMessage("Invalid Email");
                        break;
                    case "auth/email-already-in-use":
                        setErrorMessage("Email in use by another account");
                        break;
                    case "auth/weak-password":
                        setErrorMessage("Password must be at least 8 characters");
                        break;
                    default:
                        setErrorMessage("A network error occured");
                        break;
                }
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleSignUP().then(results => {
                console.log("sign up successful", results);
            });
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
        <Paper classes={{root: styles.root}} className={styles.image}>
            <Container component="main" maxWidth="md" className="bg-white dark:bg-gray-800 mb-4 shadow-md border border-gray-400 border-opacity-0 dark:border-opacity-70 p-4 flex flex-col justify-center items-center">

                <div className="mb-6 flex flex-col items-center justify-center">
                    <Avatar className={styles.avatar}/>
                    <Typography component="h1" variant="h5">
                        SIGN UP
                    </Typography>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Grid className={styles.container}>
                        <Grid container>
                            <Grid item xs={6} className={styles.space}>
                                <InputField
                                    required
                                    label="Full Name"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleInputChange}
                                    error={errors.fullName}
                                    inputIcon={<PersonOutlineOutlinedIcon color="secondary" />}
                                />
                                <InputField
                                    required
                                    label="Email Address"
                                    name="emailAddress"
                                    value={values.emailAddress}
                                    onChange={handleInputChange}
                                    error={errors.emailAddress}
                                    inputIcon={<EmailOutlinedIcon color="secondary" />}
                                />
                                <InputField
                                    required
                                    label="Password"
                                    name="password"
                                    type={passwordVisible ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleInputChange}
                                    error={errors.password}
                                    inputIcon={<LockOutlinedIcon color="secondary" />}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onMouseDown={handlePasswordVisible}
                                            >
                                                {passwordVisible ? <VisibilityOutlinedIcon color="secondary" /> : <VisibilityOffOutlinedIcon color="secondary" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <InputField
                                    required
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    value={values.confirmPassword}
                                    onChange={handleInputChange}
                                    error={errors.confirmPassword}
                                    inputIcon={<LockOutlinedIcon color="secondary" />}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onMouseDown={handleConfirmPasswordVisible}
                                            >
                                                {confirmPasswordVisible ? <VisibilityOutlinedIcon color="secondary" /> : <VisibilityOffOutlinedIcon color="secondary" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <InputField
                                    required
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleInputChange}
                                    error={errors.phoneNumber}
                                    inputIcon={<CallIcon color="secondary" />}
                                />
                            </Grid>

                            <Grid item xs={6} className={styles.space}>

                                <RadioControls
                                    required
                                    name="gender"
                                    label="Gender"
                                    value={values.gender}
                                    items={genderItems}
                                    onChange={handleInputChange}
                                />

                                <InputField
                                    required
                                    label="City"
                                    name="city"
                                    value={values.city}
                                    onChange={handleInputChange}
                                    inputIcon={<LocationCityIcon color="secondary" />}
                                />

                                <DropDown
                                    required
                                    name="departmentId"
                                    label="Department"
                                    value={values.departmentId}
                                    options={getDepartmentCollection()}
                                    onChange={handleInputChange}
                                    error={errors.departmentId}
                                />

                                <DatePicker
                                    required
                                    name="hireDate"
                                    label="Hire Date"
                                    value={values.hireDate}
                                    onChange={handleInputChange}
                                />

                                <CheckBox
                                    name="isPermanent"
                                    label="Permanent Employee"
                                    value={values.isPermanent}
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
                                text="Register"
                            />
                            <FormButton
                                variant="outlined"
                                color="secondary"
                                size="large"
                                text="Reset"
                                onClick={handleResetForm} />
                        </div>

                        {/* create account */}
                        <div className="flex flex-col justify-center items-center">
                            <Link href="/admin/auth/signin">
                                <a className="flex justify-center items-center text-lg">
                                    <p className="text-gray-700 dark:text-gray-50">Already have an account ?</p>
                                    <span className="flex justify-center items-center ml-4 text-brand dark:text-brand dark:hover:text-brand-blue hover:text-brand-blue">
                                    <p className="opacity-80">Sign in</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                </a>
                            </Link>
                        </div>
                    </Grid>

                    {/* copyright phrase on bottom of sheet */}
                    <Box>
                        <CopyRight/>
                    </Box>
                </Form>

            </Container>
        </Paper>
    );
}

export default AdminSignUpForm;
