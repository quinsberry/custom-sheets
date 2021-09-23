import { Formula } from '@/components/formula/Formula';
import { Toolbar } from '../toolbar/Toolbar';
import { Table } from '@/components/table/Table';
import { Header } from '@/components/header/Header';
import { $ } from '@/core/dom';

interface ExcelOptions {
    components: Component[];
}

type Component = typeof Formula | typeof Header | typeof Table | typeof Toolbar;
export class Excel {
    private $el: Element;
    private components: Component[];

    constructor(selector: string, options: ExcelOptions) {
        const expectedElement = document.querySelector(selector);
        if (!expectedElement) {
            throw new Error(`DOM element not found by provided selector ${selector}`);
        }
        this.$el = expectedElement;
        this.components = options?.components ?? [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        this.components.forEach(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.innerHTML = component.toHTML();
            $root.append($el);
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
    }
}