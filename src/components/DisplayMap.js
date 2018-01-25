import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { MapMarker } from './MapMarker';

export class DisplayMapComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={this.props.marker.position} >
                <MapMarker marker={this.props.marker} 
                           openInfo={true} 
                           isDisplay={true} />                        
            </GoogleMap>
        )
    }
}

const DisplayMap = withScriptjs(withGoogleMap(DisplayMapComponent))

export { DisplayMap };