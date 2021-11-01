import React, {useState} from 'react';
import Link from 'next/link';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header} from "../../../global/components/globalComponents";
import firebase from 'firebase';
import 'firebase/database';
import {CheckBox, CopyRight, Form, FormButton, InputField, Notification, UseForm} from "../../../global/global";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import {Box, Grid, IconButton, InputAdornment} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

const initialValues = {
    id: 0,
    location: '',
    longitude: '',
    latitude: '',
    details: '',
};


const AddCable = () => {
    /* data layer */
    const [{ isDrawerOpen}, dispatch] = useStateValue();
    const [load, setLoad] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});

    // notify user of successful log in or log out
    const notifyUser = () => {
        if(load){
            setNotify({
                isOpen: true,
                message: "Data Added successfully",
                type: "success"
            });
        }else{
            setNotify({
                isOpen: true,
                message: "There was an error saving data",
                type: "error"
            });
        }
    }

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('location' in fieldValues) {
            temp.location = fieldValues.location ? "" : "This Field is Required";
        }
        if ('details' in fieldValues) {
            temp.details = fieldValues.details ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleAddData = async () => {
        const addCableData = firebase.functions().httpsCallable('addCableData');
        const data = {
            id: values.lat.toString() + values.lng.toString(),
            location: values.location,
            coord: {
                lat: values.longitude,
                lng: values.latitude,
            },
            city: values.location,
            details: values.details,
        }
        setLoad(true);
        await addCableData(data).then(() => {
            notifyUser();
        }).catch(error => {
            console.log(error.message);
        });
        handleResetForm();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleAddData().then(() => {});
        }
    }

    const handleOpenDrawer = () => {
        if(isDrawerOpen){
            dispatch({
                type: actionTypes.OPEN_DRAWER,
                isDrawerOpen: false,
            });
        }else{
            dispatch({
                type: actionTypes.OPEN_DRAWER,
                isDrawerOpen: true,
            });
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
            <Header handleOpenDrawer={handleOpenDrawer} />
            <div className="pt-20 mx-12 pb-8">
                <div className="h-full shadow-md border border-gray-200 dark:border-gray-600
                        mb-4 rounded-xl bg-white dark:bg-gray-900 overflow-hidden mt-6 grid gap-0 grid-cols-8 grid-rows-1" >
                    <div className="col-span-4 h-full w-full bg-cable bg-no-repeat bg-center bg-cover flex justify-center items-center">

                    </div>
                    <div className="col-span-4 h-full overflow-auto flex justify-center items-center mx-0 border-l border-gray-200 dark:border-gray-600">
                        <div className="w-full h-full p-6 bg-white dark:bg-gray-900">
                            <h1 className="text-xl mb-8 md:text-2xl lg:text-4xl font-bold leading-tight mt-4 text-gray-700 dark:text-gray-200 text-center md:text-left">
                                Add Cable Laying
                            </h1>

                            <Form onSubmit={handleSubmit}>
                                <InputField
                                    required
                                    label="City / Town"
                                    name="location"
                                    type="text"
                                    value={values.location}
                                    onChange={handleInputChange}
                                    error={errors.location}
                                />

                                <InputField
                                    required
                                    label="Latitude"
                                    name="latitude"
                                    type="text"
                                    value={values.latitude}
                                    onChange={handleInputChange}
                                    error={errors.latitude}
                                />

                                <InputField
                                    required
                                    label="Longitude"
                                    name="longitude"
                                    type="text"
                                    value={values.longitude}
                                    onChange={handleInputChange}
                                    error={errors.longitude}
                                />

                                <InputField
                                    required
                                    multiline={true}
                                    rows={6}
                                    maxRow={20}
                                    label="Cable Details"
                                    name="details"
                                    type="text"
                                    value={values.details}
                                    onChange={handleInputChange}
                                    error={errors.details}
                                />

                                <div className="mb-4 w-full flex justify-center items-center">
                                    <FormButton
                                        className="w-full"
                                        type="submit"
                                        text="save data"
                                        color="primary"
                                    />
                                </div>
                            </Form>

                            <hr className="my-6 border-gray-300 dark:border-gray-600 w-full" />

                            <button
                                    className="w-full block bg-white hover:bg-gray-500 dark:bg-transparent dark:hover:bg-gray-200 dark:text-gray-100 dark:hover:text-gray-900 focus:bg-gray-100 text-gray-700 hover:text-gray-100 font-semibold rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-400" >
                                <div className="flex items-center justify-center">
                                    <Link href='/admin/addcable/loadfile'>
                                        <a>
                                                <span className="ml-4">
                                                    Load a JSON File
                                                </span>
                                        </a>
                                    </Link>
                                </div>
                            </button>
                            <Box mt={4}>
                                <CopyRight/>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

        </>
    );
}

export default AddCable;