import {oneElem} from 'gap-front-s';
import {PageConfig} from 'gap-front-page-config';
import {tpl} from 'gap-front-fun';
import {trans} from 'gap-front-trans';

let viewId = 0;

export class View {
    constructor(ctn) {
        if (typeof ctn == 'string') {
            ctn = oneElem(ctn);
        }

        if (ctn instanceof HTMLElement) {
            this.ctn = ctn;
        } else {
            throw new Error('ctn Error format in View');
        }

        this.tpl = tpl;
        this.trans = trans;
        this.pageConfig = new PageConfig();
        this.getConfig = this.pageConfig.get;

        this.id = 'v' + viewId++;
        this.dtoElems = {};

        this.ctn._view = this;

        this.data = null;

        let script = this.ctn.firstElementChild;
        if (script && script.tagName == 'SCRIPT') {
            this.data = JSON.parse(script.text);
            script.remove();
        }

        // -------- //

        this.render();

        this.ctn.s(`[dto-view="${this.id}"]`).map(elem => {
            let key = elem.getAttribute('dto-key');
            if (!this.dtoElems[key]) {
                this.dtoElems[key] = [];
            }
            this.dtoElems[key].push(elem);
        });

        this.startup();
    }

    render() {
    }

    startup() {
    }

    view(selector) {
        let elem = this.ctn.elem(selector);
        if (elem) {
            return elem._view || null;
        }
    }

	
    s(selector) {
        let viewArr = [];
        this.ctn.s(selector).forEach(elem => {
            if (elem._view) {
                viewArr.push(elem._view);
            }
        });
        return viewArr;
    }

	
    remove() {
        this.ctn.remove();
    }


    getCtn() {
        return this.ctn;
    }

    show() {
        this.ctn.show();
    }

    hide() {
        this.ctn.hide();
    }

    setElemVal(elem, val) {
        if (elem._view) {
            elem._view.setValue(val);
        } else if (elem.tagName == 'INPUT') {
            elem.value = val;
        } else if (elem.tagName == 'SELECT') {
            elem.elem(`option[value="${val}"]`).selected = true;
        } else if (elem.tagName == 'TEXTAREA') {
            elem.value = val;
            elem.innerHTML = val;
        } else if (elem instanceof HTMLElement) {
            elem.innerHTML = val;
        } else {
            throw new Error('unkown error in View');
        }
    }

    scriptJson(obj) {
        return '<script type="text/javascript">'
            + JSON.stringify(obj)
            + '</script>'
            + '<div class="data-rendering"></div>';
    }

    set(key, val) {
        if (!val) {
            val = '';
        }

        if (key.length > 100) {
            throw new Error(key);
        }

        // ${this.d('dtoName')}
        if (this.dtoElems.hasOwnProperty(key)) {
            this.dtoElems[key].map(elem => this.setElemVal(elem, val));
            return;
        }

        if (typeof val != 'string') {
            for (let subKey in val) {
                if (val.hasOwnProperty(subKey) && subKey[0] != '_') {
                    this.set(key + '.' + subKey, val[subKey]);
                }
            }
        }
    }

    setValue(val) {
        throw new Error('View setValue not implement: cannot setValue: ' + val);
    }

    d(dtoName) {
        return `dto-view="${this.id}" dto-key="${dtoName}"`;
    }

    plug(plugClass) {
        let plug = new plugClass(this);
        plug.startup();
        return plug;
    }
}
