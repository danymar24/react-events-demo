import React from 'react';
import { store as EventsStore} from '../stores/EventsStore';
import { observer } from 'mobx-react';

@observer
class EventsList extends React.Component {
    render() {
        const { events } = EventsStore;

        const eventsList = events.map((event, i) => (
            <li key={i}>
                <p>{event.name}</p>
                <p>{event.place}</p>
                <p>{event.description}</p>
            </li>
        ));

        return (
            <div>
                <ul>
                    {eventsList}
                </ul>
            </div>
        );
    }
}

export default EventsList;