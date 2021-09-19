import { DOMListener } from '@/core/DOMListener';

export abstract class ExcelComponent extends DOMListener {
    toHTML() {
        return '';
    }
}