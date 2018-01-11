import {Event} from 'gap-front-event';
import {s} from 'gap-front-s';

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
        s('[zload]').forEach(elem => {
            this.event.trigger('zload', elem);
        });

        s('[gap-load]').forEach(elem => {
            this.event.trigger('gapLoad', elem);
        });
    }
}
