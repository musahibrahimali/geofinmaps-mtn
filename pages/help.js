import React from 'react';
import {ClientNavbar, Header} from "../global/components/globalComponents";
import actionTypes from "../Utils/Utils";
import {useStateValue} from "../provider/AppState";

const Help = () => {
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
            <div className="bg-white dark:bg-gray-900 flex flex-col justify-between place-items-center">
                <h1 className="text-gray-700 dark:text-gray-200 uppercase text-extrabold my-4 text-xl md:text-4xl lg:text-6xl">
                    Help
                </h1>
                <div className="bg-white dark:bg-gray-900">
                    <p className="text-gray-700 dark:text-gray-200 text-justify text-base md:text-lg lg:text-xl">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Help;