import React, {useState} from 'react';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {IconButton, InputAdornment, Paper} from "@material-ui/core";
import {SignInFormStyles} from "./SignInFormStyles";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {CheckBox, CopyRight, Form, FormButton, InputField, UseForm} from "../../../../global/global";
import firebase from 'firebase';
import {useStateValue} from "../../../../provider/AppState";
import actionTypes from "../../../../Utils/Utils";

const initialValues = {
    id: 0,
    emailAddress: '',
    password: '',
    rememberMe: false,
};

const AdminSignInForm = () => {

    const styles = SignInFormStyles();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [{}, dispatch] = useStateValue();

    /* validate form */
    const handlePasswordVisible = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const validateForm = (fieldValues = values) => {
        let temp = {...errors};
        if ('password' in fieldValues) {
            temp.password = fieldValues.password ? "" : "Invalid Password";
        }

        if ('emailAddress' in fieldValues) {
            temp.emailAddress = fieldValues.emailAddress ? "" : "This Field is Required";
        }

        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleLogIn = async (event) => {
        event.preventDefault();
        await firebase.auth()
            .signInWithEmailAndPassword(
                values.emailAddress, values.password
            )
            .then((auth) => {
                if (auth) {
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
                    case "auth/user-disabled":
                        setErrorMessage("Account has been disabled");
                        break;
                    case "auth/user-not-found":
                        setErrorMessage("User not found");
                        break;
                    case "auth/wrong-password":
                        setErrorMessage("Invalid password");
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
            handleResetForm();
            handleLogIn().then(result => console.log(result));
        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
    } = UseForm(initialValues, true, validateForm);

    return (
        <>
            <Paper classes={styles.root} component="main" className={styles.image}>
                <Container component="main" maxWidth="xs"
                           className="bg-white dark:bg-gray-800 shadow-md border border-gray-400 border-opacity-0 dark:border-opacity-70 p-4 flex flex-col justify-center items-center">
                    <div className={styles.paper}>
                        <div className="mb-6 flex flex-col items-center justify-center">
                            <Avatar className={styles.avatar}/>
                            <Typography component="h1" variant="h5">
                                SIGN IN
                            </Typography>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <InputField
                                required
                                label="Email Address"
                                name="emailAddress"
                                type="email"
                                value={values.emailAddress}
                                onChange={handleInputChange}
                                error={errors.emailAddress}
                                inputIcon={<EmailOutlinedIcon color="secondary"/>}
                            />

                            {/* password field */}
                            <InputField
                                required
                                label="Password"
                                name="password"
                                type={passwordVisible ? "text" : "password"}
                                value={values.password}
                                onChange={handleInputChange}
                                error={errors.password}
                                inputIcon={<LockOutlinedIcon color="secondary"/>}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onMouseDown={handlePasswordVisible}
                                        >
                                            {
                                                passwordVisible ?
                                                    <VisibilityOutlinedIcon color="secondary"/> :
                                                    <VisibilityOffOutlinedIcon color="secondary"/>
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {/* remember me check box */}
                            <CheckBox
                                name="rememberMe"
                                label="Remember Me"
                                value={values.rememberMe}
                                onChange={handleInputChange}
                            />

                            <div className="mb-4">
                                <FormButton
                                    type="submit"
                                    text="Sign In"
                                    color="secondary"
                                />
                            </div>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="/admin/auth/forgot" variant="body2">
                                        <a className="text-brand hover:underline hover:text-brand-blue dark:text-brand dark:hover:text-brand-blue">
                                            Forgot password
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/admin/auth/signup" variant="body2">
                                        <a>Don&apos;t have an account ?
                                            {" "}
                                            <span
                                                className="text-brand hover:underline hover:text-brand-blue dark:text-brand dark:hover:text-brand-blue">
                                            Sign Up
                                        </span>
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={4}>
                                <CopyRight/>
                            </Box>
                        </Form>
                    </div>
                </Container>
            </Paper>
        </>
    );
}

export default AdminSignInForm;
