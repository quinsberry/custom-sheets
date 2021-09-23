class DOM {
    constructor() {

    }
}

export function $() {
    return new DOM();
}

$.create = (tagName: string, classes = ''): HTMLElement => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return el;
};
