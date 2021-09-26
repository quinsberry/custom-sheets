import { DOMListener } from '@/core/DOMListener';

interface ExcelComponentOptionsConfig {
    name: string;
    listeners: string[];
}

export abstract class ExcelComponent extends DOMListener {
    static className: string;

    constructor($root: Element, options?: ExcelComponentOptionsConfig) {
        super($root, options?.listeners);
    }

    toHTML() {
        return '';
    }

    init() {
        this.initDOMListeners();
    }
}