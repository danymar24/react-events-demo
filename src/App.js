import React, { Component } from 'react';
import './App.css';
import { AddEvent } from './components/AddEvent';
import EventsList from './components/EventsList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  render() {
    return (
      <div>
        <h2>Events</h2>
        <AddEvent />
        <EventsList />
      </div>
    );
  }
}

export default App;
