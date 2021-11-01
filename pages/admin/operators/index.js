import React, {useEffect, useState} from 'react';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header, ShimmerPage} from "../../../global/global";
import {UserContent} from "../../../admin/admin";
import axios from "axios";
const usersUrl = "https://us-central1-roam-ghana.cloudfunctions.net/getAllUsers";

const Operators = () => {
    /* data layer */
    const [{ isDrawerOpen}, dispatch] = useStateValue();


    const [allUsers, setAllUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    let usersData;
    let users = [];

    const getData = async () => {
        await axios(usersUrl).then((response) => {
            usersData = response.data.users;
        });

        usersData.map((user) => {
            users.push(user);
        });

        setAllUsers(users);
        if(allUsers !== null){
            setLoading(false);
        }
    }


    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    });

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
            {
                loading?
                    <ShimmerPage /> :
                    <UserContent users={allUsers}/>
            }
        </>
    );
}

export default Operators;