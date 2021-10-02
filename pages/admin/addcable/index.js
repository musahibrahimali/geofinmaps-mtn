import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header} from "../../../global/components/globalComponents";
import { Image13 } from '../../../assets/AssetExport';
import firebase from 'firebase';
import 'firebase/database';

const initialValues = {
    id: 0,
    location: '',
    longitude: '',
    latitude: '',
    cableSpecification: '',
    details: '',
};


const AddCable = () => {
    /* data layer */
    const [{ isDrawerOpen}, dispatch] = useStateValue();

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleOnValueChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
        validateForm({ [name]: value });
    }

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('location' in fieldValues) {
            temp.location = fieldValues.location ? "" : "This Field is Required";
        }
        if ('longitude' in fieldValues) {
            temp.longitude = fieldValues.longitude > 2 ? "" : "This Field is Required";
        }
        if ('latitude' in fieldValues) {
            temp.latitude = fieldValues.latitude > 2 ? "" : "This Field is Required";
        }
        if ('cableSpecification' in fieldValues) {
            temp.cableSpecification = fieldValues.cableSpecification ? "" : "This Field is Required";
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

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            await firebase.firestore().collection('laying').add({
                location: values.location,
                coordinates: {
                    lat: values.latitude,
                    lon: values.longitude,
                },
                cableSpecification: values.cableSpecification,
                details: values.details,
            });
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

    return (
        <>
            <Header handleOpenDrawer={handleOpenDrawer} />
            <div className="pt-20 mx-12 pb-8">
                <div className="h-full shadow-md border border-gray-200 dark:border-gray-600
                        mb-4 rounded-xl bg-white dark:bg-gray-900 overflow-hidden mt-6 grid gap-0 grid-cols-6 grid-rows-1" >
                    <div className="col-span-2 h-full w-full bg-yellow-500 dark:bg-gray-900 flex justify-center items-center">
                        <Image
                            src={Image13}
                            width={1000}
                            height={1000}
                            alt="cable graphics"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="col-span-4 h-full overflow-auto flex justify-center items-center mx-0 border-l border-gray-200 dark:border-gray-600">
                        <div className="w-full h-full p-6 bg-white dark:bg-gray-900">
                            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight mt-4 text-gray-700 dark:text-gray-200 text-center md:text-left">
                                Add Cable Laying
                            </h1>

                            <form className="mt-6">
                                <div className="mt-4">
                                    <label className="block text-lg md:text-xl text-gray-700 dark:text-gray-200">
                                        City or Town
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={values.location}
                                        onChange={handleOnValueChange}
                                        placeholder="Adansi North, Fomena"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-gray-700 text-lg md:text-xl dark:text-gray-200">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={values.latitude}
                                        onChange={handleOnValueChange}
                                        placeholder="123.467"
                                        className="w-full px-4 py-3 rounded-lg dark:bg-gray-200 bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none" autoFocus
                                        required
                                    />
                                    <p className="text-sm text-red-500">{errors ? errors.latitude : ""}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="block  text-gray-700 text-lg md:text-xl dark:text-gray-200">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={values.longitude}
                                        onChange={handleOnValueChange}
                                        placeholder="-123.2345"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
                                        required
                                    />
                                    <p className="text-sm text-red-500">{errors ? errors.latitude : ""}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="block  text-gray-700 text-lg md:text-xl dark:text-gray-200">
                                        Cable Specification
                                    </label>
                                    <input
                                        type="text"
                                        name="cableSpecification"
                                        value={values.cableSpecification}
                                        onChange={handleOnValueChange}
                                        placeholder="cable specification"
                                        minLength="6"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
                                    />
                                    <p className="text-sm text-red-500">{errors ? errors.latitude : ""}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="block  text-gray-700 text-lg md:text-xl dark:text-gray-200">
                                        Cable Details
                                    </label>
                                    <input
                                        type="text"
                                        name="details"
                                        value={values.details}
                                        onChange={handleOnValueChange}
                                        placeholder="Information about the cable"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
                                    />
                                    <p className="text-sm text-red-500">{errors ? errors.latitude : ""}</p>
                                </div>

                                <button
                                    onMouseDown={handleOnSubmit}
                                    type="submit"
                                    name="upload"
                                    className="w-full uppercase border border-gray-400 border-opacity-0 dark:border-gray-600 block bg-gray-900 hover:bg-gray-800 focus:bg-gray-400 text-gray-100 font-semibold rounded-lg px-4 py-3 mt-6 dark:bg-yellow-600 dark:text-gray-100 dark:hover:bg-transparent dark:hover:text-gray-200 dark:hover:border-gray-300 transition-all ease-in-out duration-150">
                                    Add Data
                                </button>
                            </form>

                            <hr className="my-6 border-gray-300 dark:border-gray-600 w-full" />

                            <button type="button"
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCable;