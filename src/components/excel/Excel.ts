import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Header } from '@/components/header/Header';
import { $, DOM } from '@/core/dom';
import { assertNonNull } from '@/utils/type-guards';

interface ExcelOptions<C> {
    components: C[];
}

type ComponentClasses = typeof Formula | typeof Header | typeof Table | typeof Toolbar;
type ComponentInstances = Formula | Header | Table | Toolbar;

export class Excel {
    private $el: DOM;
    private components: ComponentInstances[] = [];
    private componentsInits: ComponentClasses[];

    constructor(selector: string, options: ExcelOptions<ComponentClasses>) {
        const expectedElement = document.querySelector(selector);
        assertNonNull(expectedElement, `DOM element not found by provided selector ${selector}`);

        this.$el = $(expectedElement);
        this.componentsInits = options?.components ?? [];
    }

    getRoot(): DOM {
        const $root = $.create('div', 'excel');

        this.components = this.componentsInits.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init());
    }
}