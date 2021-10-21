import React from 'react';
import {Header} from "../../../global/components/globalComponents";
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import ReportData from "../../../data/reportsData.json";
import {ReportContent} from "../../../admin/admin";

const Reports = (props) => {
    const {reports} = props;
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

    return (
        <>
            <Header handleOpenDrawer={handleOpenDrawer} />
            <ReportContent reports={reports} />
        </>
    );
}

/* fetch data from database */
export const getStaticProps = async () => {
    // const response = await fetch(OperatorsData); /// pass api end point
    // const data = await response.json();
    const response = await ReportData;
    const data = await response;


    return {
        props: { reports: data },
    }
}

export default Reports;