import React, {useEffect, useState} from 'react';
import {Header, ShimmerPage} from "../../../global/global";
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {ReportContent} from "../../../admin/admin";
import axios from "axios";
const reportsUrl = "https://us-central1-roam-ghana.cloudfunctions.net/getAllReports";

const Reports = () => {
    /* data layer */
    const [{ isDrawerOpen}, dispatch] = useStateValue();

    const [allReports, setAllReports] = useState(null);
    const [loading, setLoading] = useState(true);

    let reportsData;
    let reports = [];

    const getData = async () => {
        await axios(reportsUrl).then((response) => {
            reportsData = response.data.reports;
        });

        reportsData.map((report) => {
            reports.push(report);
        });

        setAllReports(reports);
        if(allReports !== null){
            setLoading(false);
        }
    }


    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    },[]);

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
                    <ReportContent reports={allReports}/>
            }
        </>
    );
}

export default Reports;