import React from 'react';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header} from "../../../global/components/globalComponents";

const Report = (props) => {
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

        </>
    );
}

export default Report;