import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline } from 'react-google-maps';
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import {ConfirmDialog, FormButton, Notification, PopUp, ReportForm} from "../../../../global/global";
import firebase from 'firebase';
import {useStateValue} from "../../../../provider/AppState";
const initialPosition = { lat: 6.673175, lng: -1.565423 };

const fibreLayingCoordinates = [
    { lat: 6.6699666789763885, lng: -1.5765456968379823 },
    { lat: 6.672664232015921, lng: -1.5726614434823272 },
    { lat: 6.675874150071826, lng: -1.5677302624644058 },
    { lat: 6.674623339435071, lng: -1.5647412081243117 },
    { lat: 6.6794833239758375, lng: -1.559168088045109 },
];

const Map = () => {
    const [position, setPosition] = useState(initialPosition);
    const [isLocation, setIsLocation] = useState(false);

    const setUserPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition({
            lat: latitude,
            lng: longitude,
        });
    }

    useEffect(() => {
        const getUserLocation = async () => {
            const position = await navigator.geolocation.getCurrentPosition(setUserPosition);
            if (position) {
                setIsLocation(!isLocation);
            }
        }
        getUserLocation().then(results => console.log(results) );
    }, [isLocation, position]);


    return (
        <>
            <GoogleMap
                defaultZoom={16.0}
                defaultCenter={position}
                defaultOptions={{
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            'roadmap', 'satellite'
                        ],
                    },
                }}>
                {
                    fibreLayingCoordinates.map((item, index) => {
                        return (
                            <DefaultMarker key={index} item={item} />
                        );
                    })
                }
                <Polyline
                    path={fibreLayingCoordinates}
                    options={{
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    }}
                />
            </GoogleMap>
        </>
    );
}

const DefaultMarker = (props) => {
    const { item } = props;
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title:"", subTitle:""});
    const [markerOpen, setMarkerOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [add, setAdd] = useState(false);
    const [{user}] = useStateValue();

    // notify user of successful log in or log out
    const notifyUser = () => {
        if(add){
            setNotify({
                isOpen: true,
                message: "report submitted Successfully",
                type: "success"
            });
        }else{
            setNotify({
                isOpen: true,
                message: "Report could not be submitted",
                type: "error"
            });
        }
    }

    const onToggleOpen = () => {
        setMarkerOpen(!markerOpen);
    }

    // close pop up
    const handleOpenPopUP = () => {
        setOpenPopUp(!openPopUp);
    }

    const AddReport = ({report}) => {
            const data = {
                userUID: user.uid,
                fullName: report.fullName,
                emailAddress: report.emailAddress,
                location: report.location,
                description: report.description,
                level: report.level,
                title : report.title,
                reportDate: report.reportDate,
                coord: {
                    lat: item.lat,
                    lng: item.lng,
                }
            }
        const addReport = firebase.functions.httpsCallable('addReport');
        addReport(data).then(() => {
            setAdd(true);
        }).catch(() => {

        })
    }

    // add or edit entry
    const addOrEdit = (report, item, handleResetForm) => {
        handleResetForm();
        AddReport(report);
        setOpenPopUp(false);
        notifyUser();
    }

    return(
        <>
            <Marker
                label={{
                    text: "N",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                }}
                position={{ lat: item.lat, lng: item.lng }}
                animation={google.maps.Animation.DROP}
                onClick={onToggleOpen}>
                {
                    markerOpen &&
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
                                            {item.lat.toString()}
                                        </p>
                                        <p className="text-blue-600 dark:text-gray-100 font-bold">
                                            {item.lng.toString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoWindow>
                }
            </Marker>

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

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* confirm dialog */}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </>

    );
}

export default Map;