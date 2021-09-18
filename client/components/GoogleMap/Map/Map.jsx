import { useEffect, useState } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

const initialPosition = { lat: 6.673175, lng: -1.565423 };

const Map = () => {
    const [position, setPosition] = useState(initialPosition);
    const [isLocation, setIsLocation] = useState(false);

    useEffect(() => {
        const getUserLocation = async () => {
            const position = await navigator.geolocation.getCurrentPosition(setUserPosition);
            if (position) {
                setIsLocation(!isLocation);
            }
        }
        getUserLocation();
    }, [isLocation, position]);

    const setUserPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition({
            lat: latitude,
            lng: longitude,
        });
    }

    return (
        <GoogleMap
            defaultZoom={18.0}
            defaultCenter={position}
            defaultOptions={{
                mapTypeControlOptions: {
                    mapTypeIds: [
                        'roadmap', 'satellite'
                    ],
                    // style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                },
            }}
        >
            <Marker position={position} />
        </GoogleMap>
    );
}

export default Map;