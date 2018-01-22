import React from 'react';
import { store as EventsStore } from '../stores/EventsStore';
import { AddEventMap } from './AddEventMap';
import { store as MapStore } from '../stores/MapStore';

class AddEvent extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAddEvent(e) {
        e.preventDefault();

        const name = this.refs.name.value.trim();
        const place = this.refs.place.value.trim();
        const description = this.refs.description.value.trim();

        let event = {
            name,
            place,
            description,
            location: MapStore.selectedLocation
        };

        EventsStore.events.push(event);
    }

    render() {
        return (
            <div>
                <p>Add event</p>
                <div className='inline-block add-event-form'>
                    <form onSubmit={this.handleAddEvent.bind(this)}>
                        <input type='text' ref='name' placeholder='Name' />
                        <input type='text' ref='place' placeholder='Place' />
                        <textarea ref='description' placeholder='Description' />
                        <button>Add</button>
                    </form>
                </div>
                <div className='inline-block add-event-map'>
                    <AddEventMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                                 loadingElement={<div style={{ height: `100%` }} />}
                                 containerElement={<div style={{ height: `300px` }} />}
                                 mapElement={<div style={{ height: `100%` }} />} />
                </div>
            </div>
        );
    }
}

export { AddEvent };