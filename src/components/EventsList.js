import React from 'react';
import { store as EventsStore} from '../stores/EventsStore';
import { observer } from 'mobx-react';
import { EventDisplay } from './EventDisplay';

@observer
class EventsList extends React.Component {
    render() {
        const { events } = EventsStore;

        const eventsList = events.map((event, i) => (
            <EventDisplay event={event} key={i}/>
        ));

        return (
            <div>
                {eventsList}
            </div>
        );
    }
}

export default EventsList;