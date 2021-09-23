export abstract class DOMListener {
    private $root: Element;

    constructor($root: Element) {
        this.$root = $root;
    }
}