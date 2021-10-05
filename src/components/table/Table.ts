import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $, DOM } from '@/core/dom';
import { resizeHandler } from '@/components/table/table.resize';
import { isOfType } from '@/utils/type-guards';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root: DOM) {
        super($root, {
            name: 'table',
            listeners: ['mousedown'],
        });
    }

    toHTML(): string {
        return createTable(20);
    }

    onMousedown(e: MouseEvent) {
        if (isOfType<HTMLElement>(e.target, el => el?.dataset?.resize)) {
            resizeHandler(e, this.$root);
        }
    }
}