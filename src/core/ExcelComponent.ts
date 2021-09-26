import { DOMListener } from '@/core/DOMListener';
import { DOM } from '@/core/dom';

interface ExcelComponentOptionsConfig {
    name: string;
    listeners: string[];
}

export abstract class ExcelComponent extends DOMListener {
    static className: string;

    constructor($root: DOM, options?: ExcelComponentOptionsConfig) {
        super($root, options);
    }

    toHTML() {
        return '';
    }

    init() {
        this.initDOMListeners();
    }
}