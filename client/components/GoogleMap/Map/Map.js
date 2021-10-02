import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import {FormButton, PopUp, ReportForm} from "../../../../global/global";

const initialPosition = { lat: 6.673175, lng: -1.565423 };

const Map = () => {
    const [position, setPosition] = useState(initialPosition);
    const [isLocation, setIsLocation] = useState(false);
    const [markerOpen, setMarkerOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title:"", subTitle:""});

    const setUserPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition({
            lat: latitude,
            lng: longitude,
        });
    }

    const onToggleOpen = () => {
        setMarkerOpen(!markerOpen);
    }

    // close pop up
    const handleOpenPopUP = () => {
        setOpenPopUp(!openPopUp);
    }

    const AddReport = () => {
        console.log("added report");
    }

    // add or edit entry
    const addOrEdit = (report, handleResetForm) => {
        handleResetForm();
        setOpenPopUp(false);
        AddReport();
        setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success"
        })
    }

    useEffect(() => {
        // const getUserLocation = async () => {
        //     const position = await navigator.geolocation.getCurrentPosition(setUserPosition);
        //     if (position) {
        //         setIsLocation(!isLocation);
        //     }
        // }
        // getUserLocation().then(results => console.log(results) );
    }, [isLocation, position]);


    return (
        <>
            <GoogleMap
                defaultZoom={18.0}
                defaultCenter={position}
                defaultOptions={{
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            'roadmap', 'satellite'
                        ],
                    },
                }}>
                <Marker
                    position={position}
                    onClick={onToggleOpen}>
                    {markerOpen &&
                    <InfoWindow onCloseClick={onToggleOpen}>
                        <div className="px-1 flex flex-col justify-between items-center w-auto bg-white dark:bg-gray-800 h-auto">
                            <div className="flex justify-between items-center border-b border-gray-400">
                                <div className="flex mr-16 justify-center items-center">
                                    <p className="text-blue-600 cursor-pointer font-bold text-sm">Node Point</p>
                                </div>
                                <FormButton
                                    size="small"
                                    text="report"
                                    onClick={handleOpenPopUP}
                                />
                            </div>
                            <div className="flex flex-col justify-between items-center py-2">
                                <p className="text-lg text-blue-600 font-bold">
                                    Lorem ipsum dolor sit amet
                                </p>
                                <p className="text-gray-700 dark:text-gray-100">
                                    Lorem ipsum dolor sit amet
                                </p>
                                <div className="flex flex-col mt-2">
                                    <h1 className="text-blue-600 font-bold text-lg">
                                        Kumasi Central
                                    </h1>
                                    <div className="flex flex-col justify-between items-center">
                                        <p className="text-blue-600 dark:text-gray-100 font-bold">
                                            {position.lat.toString()}
                                        </p>
                                        <p className="text-blue-600 dark:text-gray-100 font-bold">
                                            {position.lng.toString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoWindow>
                    }
                </Marker>
                {/*<Marker position={position} />*/}
            </GoogleMap>

            <PopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                title={"Report Form"}
                color="secondary"
                iconColor="primary">
                <ReportForm
                    addOrEdit={addOrEdit}
                    recordForEdit={null}
                />
            </PopUp>

        </>
    );
}

export default Map;