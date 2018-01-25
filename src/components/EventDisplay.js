import React from 'react';
import PropTypes from 'prop-types';
import { DisplayMap } from './DisplayMap';

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={{display: `inline-block`, padding: `15px` }}>
                <p>{this.props.event.name}</p>
                <p>{this.props.event.date}</p>
                <p>{this.props.event.place}</p>
                <p>{this.props.event.description}</p>
                <DisplayMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `300px` }} />}
                            mapElement={<div style={{ height: `100%`, width: `300px`, display: `inline-block` }} />}
                            marker={this.props.event} />
            </div>
        );
    }
}

EventDisplay.propTypes = {
    event: PropTypes.object
}

export { EventDisplay };