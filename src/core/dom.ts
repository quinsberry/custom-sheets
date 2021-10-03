import { assertNonNull, assertType } from '@/utils/type-guards';

export class DOM {
    $el: HTMLElement;

    constructor(selector: string | Element) {
        const expectedElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
        assertNonNull(expectedElement, `DOM element not found by provided selector ${selector}`);
        assertType<HTMLElement>(expectedElement, el => 'style' in el, 'DOM element should be extended from HTMLElement');

        this.$el = expectedElement;
    }

    get data(): DOMStringMap {
        return this.$el.dataset;
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

    off(eventType: string, cb: (e: Event) => void) {
        this.$el.removeEventListener(eventType, cb);
    }

    append(node: DOM | Element): DOM {
        if (node instanceof DOM) {
            node = node.$el;
        }
        this.$el.append(node);
        return this;
    }

    closest(selector: string): DOM {
        const element = this.$el.closest(selector);
        assertNonNull(element, `Closest element with selector ${selector} was not found`);
        return $(element);
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    findAll(selector: string) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles: Partial<Omit<CSSStyleDeclaration, 'parentRule' | 'length'>>) {
        Object.entries(styles).forEach(([key, value]) => {
            // @ts-ignore Cannot fix this error - S7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
            this.$el.style[key] = value;
        });
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
