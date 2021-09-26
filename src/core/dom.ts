import { assertNonNull } from '@/utils/type-guards';

export class DOM {
    $el: Element;

    constructor(selector: string | Element) {
        const expectedElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
        assertNonNull(expectedElement, `DOM element not found by provided selector ${selector}`);

        this.$el = expectedElement;
    }

    html(html?: string): DOM | string {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    clear(): DOM {
        this.html('');
        return this;
    }

    on(eventType: string, cb: (e: Event) => void) {
        this.$el.addEventListener(eventType, cb);
    }

    append(node: DOM | Element): DOM {
        if (node instanceof DOM) {
            node = node.$el;
        }
        this.$el.append(node);
        return this;
    }
}

export function $(selector: string | Element) {
    return new DOM(selector);
}

$.create = (tagName: string, classes = ''): DOM => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
