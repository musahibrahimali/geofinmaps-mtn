import React, {useEffect, useState} from 'react';
import {useStateValue} from "../../provider/AppState";
import actionTypes from "../../Utils/Utils";
import {Header, ShimmerPage} from "../../global/global";
import {AdminHome} from '../../admin/admin';
import axios from "axios";

const usersUrl = process.env.ALLUSERSURL;
const reportsUrl = process.env.ALLREPORTSURL;

const AdminIndex = () => {
    const [{ isDrawerOpen}, dispatch] = useStateValue();

    const [allUsers, setAllUsers] = useState(null);
    const [allReports, setAllReports] = useState(null);
    const [loading, setLoading] = useState(true);

    let usersData;
    let reportsData;
    let users = [];
    let reports = [];

    const getData = async () => {
        await axios(usersUrl).then((response) => {
            usersData = response.data.users;
        });

        await axios(reportsUrl).then((response) => {
            reportsData = response.data.reports;
        });

        usersData.map((user) => {
           users.push(user);
        });

        reportsData.map((report) => {
           reports.push(report);
        });

        setAllReports(reports);
        setAllUsers(users);
        if(allUsers !== null && allReports !== null){
            setLoading(false);
        }
    }


    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    });

    /* data layer */
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
                loading ?
                    <ShimmerPage /> :
                    <AdminHome users={allUsers} reports={allReports}/>
            }
        </>
    );
};

export default AdminIndex;