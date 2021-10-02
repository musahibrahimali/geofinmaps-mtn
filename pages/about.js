import React from 'react';
import {useStateValue} from "../provider/AppState";
import actionTypes from "../Utils/Utils";
import {ClientNavbar, Header} from "../global/components/globalComponents";

const About = () => {
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
            <ClientNavbar handleOpenDrawer={handleOpenDrawer}/>

        </>
    );
};

export default About;