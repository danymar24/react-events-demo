import { observable } from 'mobx';

class MapStore {
    @observable selectedPlace = {};
    @observable markers = [];
}

const store = new MapStore;

export { store };