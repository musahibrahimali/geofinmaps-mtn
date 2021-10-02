import React from 'react';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header} from "../../../global/components/globalComponents";
import OperatorsData from "../../../data/operators.json";
import {UserContent} from "../../../admin/admin";

const Operators = (props) => {
    const {users} = props;
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
            <UserContent users={users} />
        </>
    );
}

/* fetch data from database */
export const getStaticProps = async () => {
    // const response = await fetch(OperatorsData); /// pass api end point
    // const data = await response.json();
    const users = await OperatorsData;
    const userData = await users;


    return {
        props: { users: userData },
    }
}

export default Operators;