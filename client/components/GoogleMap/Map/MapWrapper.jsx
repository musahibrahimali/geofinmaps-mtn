import { withScriptjs, withGoogleMap } from 'react-google-maps';
import Map from './Map';

const MapWrapper = withScriptjs(withGoogleMap(() =>
    <Map />
));

export default MapWrapper;