import { ExcelComponent } from '@/core/ExcelComponent';
import { DOM } from '@/core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root: DOM) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click'],
        });
    }

    toHTML(): string {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    private onInput(e: Event) {
    }

    private onClick(e: Event) {

    }
}