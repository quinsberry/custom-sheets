import { Formula } from '@/components/formula/Formula';
import { Toolbar } from '../toolbar/Toolbar';
import { Table } from '@/components/table/Table';
import { Header } from '@/components/header/Header';
import { $, DOM } from '@/core/dom';
import { assertNonNull } from '@/utils/type-guards';

interface ExcelOptions {
    components: Component[];
}

type Component = typeof Formula | typeof Header | typeof Table | typeof Toolbar;
export class Excel {
    private $el: DOM;
    private components: Component[];

    constructor(selector: string, options: ExcelOptions) {
        const expectedElement = document.querySelector(selector);
        assertNonNull(expectedElement, `DOM element not found by provided selector ${selector}`);

        this.$el = $(expectedElement);
        this.components = options?.components ?? [];
    }

    getRoot(): DOM {
        const $root = $.create('div', 'excel');

        this.components.forEach(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el.$el);
            $el.html(component.toHTML());
            $root.append($el);
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
    }
}