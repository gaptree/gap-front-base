import {allElem, oneElem} from 'gap-front-s';

export {Dto} from './js/Dto.js';
export {View} from './js/View.js';
export {Loader} from './js/Loader.js';

export function buildView(opts) {
    const views = [];

    for (let selector in opts) {
        if (opts.hasOwnProperty(selector)) {
            const viewClass = opts[selector];

            allElem(selector).map(elem => {
                if (!elem._view) {
                    views.push(new viewClass(elem));
                }
            });
        }
    }
}

export function oneView(query) {
    const elem = oneElem(query);
    if (elem && elem._view) {
        return elem._view;
    }
}

export function allView(query) {
    const viewArr = [];
    allElem(query).map(elem => {
        if (elem._view) {
            viewArr.push(elem._view);
        }
    });
    return viewArr;
}
