import React from 'react';

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <p>{this.props.event.name}</p>
                <p>{this.props.event.place}</p>
                <p>{this.props.event.description}</p>
                <p>{this.props.event.location.lat}, {this.props.event.location.lng}</p>
            </div>
        );
    }
}

export { EventDisplay };