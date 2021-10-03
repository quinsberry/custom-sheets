import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $, DOM } from '@/core/dom';
import { assertType, assertUnreachable, isOfType, validateFirstElementInList } from '@/utils/type-guards';

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
            const $resizer = $(e.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();

            const getRowResizeHandler = () => {
                return (event: MouseEvent) => {
                    const delta = event.pageY - coords.bottom;
                    const value = coords.height + delta;
                    $parent.css({ height: value + 'px' });
                };
            };

            const getColResizeHandler = () => {
                const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
                assertType<NodeListOf<HTMLElement>>(cells, elems => 'style' in elems[0] && 'style' in elems[1]);

                return (event: MouseEvent) => {
                    const delta = event.pageX - coords.right;
                    const value = coords.width + delta;
                    $parent.css({ width: value + 'px' });
                    cells.forEach(el => el.style.width = value + 'px');
                };
            };

            const getHandler = () => {
                switch ($resizer.data.resize) {
                    case 'row':
                        return getRowResizeHandler();
                    case 'col':
                        return getColResizeHandler();
                    default:
                        assertUnreachable($resizer.data.resize as never);
                        return null;
                }
            };

            document.onmousemove = getHandler();
            document.onmouseup = () => {
                document.onmousemove = null;
            };
        }
    }
}