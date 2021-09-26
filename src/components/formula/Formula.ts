import { ExcelComponent } from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root: Element) {
        super($root, {
            name: 'formula',
            listeners: ['input'],
        });
    }

    toHTML(): string {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(event: Event) {
        console.log('onInput, formula: ', event);
    }
}