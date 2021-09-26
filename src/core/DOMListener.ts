export abstract class DOMListener {
    public $root: Element;
    private listeners: string[];

    constructor($root: Element, listeners: string[] = []) {
        this.$root = $root;
        this.listeners = listeners;
    }

    protected initDOMListeners() {
        console.log(this.listeners);
    }

    protected removeDOMListeners() {}
}