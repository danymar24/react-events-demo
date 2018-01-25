import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import _ from 'lodash';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { store as MapStore } from '../stores/MapStore';
import { MapMarker } from './MapMarker';

class AddEventMapComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bounds: null,
            markers: [],
        };
    }

    componentWillMount() {
        
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const currentLocation = {
                position: { lat, lng }
            };

            this.setState({
                center: currentLocation.position,
                markers: [currentLocation]
            });
            MapStore.selectedPlace.position = currentLocation.position;
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
                placeInfo: place,
                position: place.geometry.location,
                open: false
            }));
            
            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
            this.setState({
                center: nextCenter,
                markers: nextMarkers,
            });

            MapStore.selectedPlace.position = { lat: nextCenter.lat(), lng: nextCenter.lng() };
        };

        this.locationClicked = (e) => {
            MapStore.selectedPlace.position = { lat: e.latLng.lat(), lng: e.latLng.lng()};
            console.log(e);
            this.setState({
                markers: [MapStore.selectedPlace]
            });
        }  
    }


    renderMarkers() {
        return this.state.markers.map((marker, index) => (
                <MapMarker key={index}
                        marker={marker} />
            )
        ) 
    }

    render() {
        return (
            <GoogleMap ref='map'
                       defaultZoom={14}
                       center={this.state.center}
                       onBoundsChanged={this.onBoundsChanged}
                       onClick={this.locationClicked} >
                <SearchBox ref='searchBox'
                           bounds={this.bounds}
                           controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                           onPlacesChanged={this.onPlacesChanged} >
                    <input type="text"
                           placeholder="Search place"
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
                { this.renderMarkers() }
            </GoogleMap>
        )
    }
};

const AddEventMap = withScriptjs(withGoogleMap(AddEventMapComponent))

export { AddEventMap };