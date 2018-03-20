import {Event} from 'gap-front-event';
import {allElem} from 'gap-front-web';

export class Loader {
    constructor() {
        this.event = new Event();

        document.ready(() => {
            this.load();
        });
    }

    on(type, listener) {
        this.event.on(type, listener);
    }

    load() {
        allElem('[zload]').forEach(elem => {
            this.event.trigger('zload', elem);
        });

        allElem('[gap-load]').forEach(elem => {
            this.event.trigger('gapLoad', elem);
        });
    }
}
