import MapWrapper from "./Map/MapWrapper";
const mapApiKey = "AIzaSyBxez--w-bonusq592_-nLeqakIAXje2BU";

const GoogleMapView = () => {

    return (
        <div className="h-screen w-full z-40">
            <MapWrapper
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapApiKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default GoogleMapView;