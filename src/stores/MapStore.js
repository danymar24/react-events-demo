import { observable } from 'mobx';

class MapStore {
    @observable selectedLocation = {};
}

const store = new MapStore;

export { store };