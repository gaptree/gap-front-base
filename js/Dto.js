import {Event} from 'gap-front-event';

export class Dto {
    constructor(data = {}, binds = []) {
        this.data = {};
        this.bindMap = {};
        this.event = new Event();

        binds.map(item => this.bind(item));
        this.load(data);
    }

    set(key, val) {
        this.data[key] = val;
        this.event.trigger('change', key, val);
        return this;
    }

    get(key) {
        return this.data[key] || undefined;
    }

    del(key) {
        delete this.data[key];
        return this;
    }

    load(data = {}) {
        for(let key in data) {
            if (data.hasOwnProperty(key)) {
                this.set(key, data[key]);
            }
        }

        return this;
    }

    clear() {
        for (let key in this.data) {
            this.del(key, null);
        }
        return this;
    }

    bind(item) {
        if (!item.id) {
            return;
        }
        if (this.bindMap[item.id]) {
            return;
        }

        this.bindMap[item.id] = 1;
        if (item.set) {
            this.event.on('change', (key, value) => {
                item.set(key, value);
            });
        }
    }
}
