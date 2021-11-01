import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header, ShimmerPage} from "../../../global/components/globalComponents";
import axios from "axios";
import {userIcon} from "../../../assets/AssetExport";
const usersUrl = "https://us-central1-roam-ghana.cloudfunctions.net/getAllUsers";

const Operator = ({id}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    let usersData;

    const getData = async () => {
        await axios(usersUrl).then((response) => {
            usersData = response.data.users;
        });

        usersData.map((user) => {
            if(user.id === id){
                setUser(user);
            }
        });

        if(user !== null){
            setLoading(false);
        }
    }

    /* data layer */
    const [{ isDrawerOpen}, dispatch] = useStateValue();
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

    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    });

    return (
        <>
            {
                loading ?
                    <ShimmerPage /> :
                    <div>
                        <Header handleOpenDrawer={handleOpenDrawer} />
                        <div className="px-8 py-24">
                            <div className="md:grid grid-cols-4 grid-rows-2  bg-white dark:bg-gray-900 gap-2">
                                <div className="bg-white dark:bg-gray-900 md:col-span-1 h-48 shadow-md">
                                    <div className="bg-white dark:bg-gray-900 flex w-full h-full relative justify-center object-cover" >
                                        <Image
                                            loading='lazy'
                                            src={userIcon}
                                            width={190}
                                            height={120}
                                            className="object-cover m-auto"
                                            alt="this is a demo image"
                                        />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 md:col-span-3 h-48 shadow-md p-4">
                                    <div className="bg-white dark:bg-gray-900 border border-solid border-gray-400 dark:border-gray-600 flex m-2">
                                    <span
                                        className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200
                                        font-bold uppercase rounded-l px-4 py-2 bg-white dark:bg-gray-900
                                        shadow-sm w-2/6; whitespace-no-wrap">
                                        Name
                                    </span>
                                        <input
                                            className="px-4 border-l-2 w-full text-left bg-white dark:bg-gray-900 text-base
                                                           md:text-lg lg:text-xl text-gray-500 dark:text-gray-100
                                                           uppercase font-bold cursor-default border-gray-400
                                                           dark:border-gray-600 focus:outline-none  rounded-md
                                                           rounded-l-none shadow-sm -ml-1 w-4/6;"
                                            type="text"
                                            value={user.fullName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 flex m-2 border border-solid
                                                        border-gray-400 dark:border-gray-600">
                                    <span className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200
                                                    font-bold uppercase rounded-l px-4 py-2 bg-white dark:bg-gray-900
                                                    shadow-sm w-2/6; whitespace-no-wrap">
                                        Email
                                    </span>
                                        <input
                                            className="px-4 w-full border-l-2 text-left bg-white dark:bg-gray-900 text-base
                                                          text-gray-500 dark:text-gray-100
                                                           font-bold cursor-default border-gray-400
                                                           dark:border-gray-600 focus:outline-none  rounded-md
                                                           rounded-l-none shadow-sm -ml-1 w-4/6;"
                                            type="text"
                                            value={user.emailAddress}
                                            readOnly
                                        />
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 flex m-2 border border-solid border-gray-400 dark:border-gray-600" >
                                    <span className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200
                                                    font-bold uppercase rounded-l px-4 py-2 bg-white dark:bg-gray-900
                                                     shadow-sm w-2/6; whitespace-no-wrap">
                                        Dept.
                                    </span>
                                        <input
                                            className="px-4 border-l-2 text-left bg-white dark:bg-gray-900 text-base
                                                           md:text-lg lg:text-xl text-gray-500 dark:text-gray-100
                                                           uppercase font-bold cursor-default border-gray-400
                                                           dark:border-gray-600 focus:outline-none  rounded-md
                                                           rounded-l-none shadow-sm -ml-1 w-4/6;"
                                            type="text"
                                            value={user.department}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 md:col-span-4 shadow-md p-4 mb-4">
                                    <h3 className="p-2 mt-4 mb-4 text-base text-center md:text-left md:text-lg
                                                        lg:text-xl text-gray-800 dark:text-gray-300 uppercase
                                                        font-extrabold tracking-wide md:tracking-wider
                                                        lg:tracking-widest cursor-default" >
                                        Profile Description
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-justify font-normal text-base md:text-lg lg:text-xl">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad est libero modi
                                        non odio provident qui quod sed sit ullam. Accusantium animi dolorum
                                        error hic sequi ut, voluptas. Commodi, id.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
            }

        </>
    );
}

    export const getStaticPaths = async () => {
        let usersData;

        await axios(usersUrl).then((response) => {
            usersData = response.data.users;
        });

        const paths = usersData.map((user) => {
            return {
                params: { id: user.id.toString() }
            }
        });

        return {
            paths: paths,
            fallback: false,
        }
    }

    export const getStaticProps = async (context) => {
        const id = context.params.id;

        return {
            props: {
                id: id
            }
        }
    }

export default Operator;