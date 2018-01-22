import { observable } from 'mobx';

class EventsStore {
    @observable events = []
}

var store = new EventsStore;

export { store };