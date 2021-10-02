import React, {useEffect} from 'react';
import {useStateValue} from "../../provider/AppState";
import {useRouter} from "next/router";
import actionTypes from "../../Utils/Utils";
import {Header} from "../../global/components/globalComponents";
import {AdminHome} from '../../admin/admin';
import ReportData from '../../data/reportsData.json';
import OperatorsData from '../../data/operators.json';

const AdminIndex = (props) => {
    const { reports, users } = props;
    const [{ user, isDrawerOpen}, dispatch] = useStateValue();
    const router = useRouter();

    useEffect(() => {
        // if(!user){
        //     router.replace('/admin/auth').then(result => console.log(result));
        // }
    },[router, user]);

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
            <AdminHome reports={reports} users={users} />
        </>
    );
};

/* fetch data from database */
export const getStaticProps = async () => {
    // const response = await fetch(OperatorsData); /// pass api end point
    // const data = await response.json();
    const response = await ReportData;
    const users = await OperatorsData;
    const data = await response;
    const userData = await users;


    return {
        props: { reports: data, users: userData },
    }
}

export default AdminIndex;