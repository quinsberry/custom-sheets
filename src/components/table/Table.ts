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
            let value: number = 0;
            const type = $resizer.data.resize;

            $resizer.css({
                opacity: '1',
                ...(type === 'col' ? { bottom: '-2000px' } : undefined),
                ...(type === 'row' ? { right: '-2000px' } : undefined),
            });


            document.onmousemove = event => {
                if (type === 'col') {
                    const delta = event.pageX - coords.right;
                    value = coords.width + delta;
                    $resizer.css({
                        right: -delta + 'px',
                    });
                } else if (type === 'row') {
                    const delta = event.pageY - coords.bottom;
                    value = coords.height + delta;
                    $resizer.css({
                        bottom: -delta + 'px',
                    });
                } else {
                    assertUnreachable($resizer.data.resize as never);
                }
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;

                if (type === 'col') {
                    $parent.css({ width: value + 'px' });
                    const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
                    assertType<NodeListOf<HTMLElement>>(cells, elems => 'style' in elems[0] && 'style' in elems[1]);
                    cells.forEach(el => el.style.width = value + 'px');
                } else if (type === 'row') {
                    $parent.css({ height: value + 'px' });
                } else {
                    assertUnreachable($resizer.data.resize as never);
                }

                $resizer.css({
                    opacity: '0',
                    bottom: '0',
                    right: '0',
                });
            };
        }
    }
}