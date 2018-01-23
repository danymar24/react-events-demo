import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { store as MapStore } from '../stores/MapStore';

class AddEventMapComponent extends React.Component {

    componentWillMount() {

        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            this.setState({
                center: { lat, lng }
            });
            MapStore.selectedLocation = { lat, lng };
        });

        this.setState({
            bounds: null,
            markers: [],
    
        });
    
        this.onBoundsChanged = () => {
            this.setState({
                bounds: this.refs.map.getBounds(),
                center: this.refs.map.getCenter(),
            });
        };
    
        this.onPlacesChanged = () => {
            const places = this.refs.searchBox.getPlaces();
            const bounds = new window.google.maps.LatLngBounds();
            places.forEach(place => {
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            const nextMarkers = places.map(place => ({
                position: place.geometry.location,
            }));
            
            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
            this.setState({
                center: nextCenter,
                markers: nextMarkers,
            });

            MapStore.selectedLocation = { lat: nextCenter.lat(), lng: nextCenter.lng() };
        };
    }

    markerDragged(e) {
        MapStore.selectedLocation = { lat: e.latLng.lat(), lng: e.latLng.lng()};
    }

    render() {
        return (
            <GoogleMap ref='map'
                       defaultZoom={15}
                       center={this.state.center}
                       onBoundsChanged={this.onBoundsChanged} >
                <SearchBox ref='searchBox'
                           bounds={this.bounds}
                           controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                           onPlacesChanged={this.onPlacesChanged} >
                    <input type="text"
                           placeholder="Customized your placeholder"
                           style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                marginTop: `10px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                    }} />
                </SearchBox>
                {this.state.markers.map((marker, index) =>
                    <Marker key={index} 
                            position={marker.position} 
                            draggable={true}
                            onDragEnd={this.markerDragged}/>
                )}
            </GoogleMap>
        )
    }
};

const AddEventMap = withScriptjs(withGoogleMap(AddEventMapComponent))

export { AddEventMap };