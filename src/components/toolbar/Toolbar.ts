import { ExcelComponent } from '@/core/ExcelComponent';
import { DOM } from '@/core/dom';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar';

    constructor($root: DOM) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
        });
    }

    onClick(e: Event) {
        console.log(e.target);
    }

    toHTML(): string {
        return `
            <div class="button">
                <span class="material-icons-outlined">
                    format_align_left
                </span>
            </div>
            <div class="button">
                <span class="material-icons-outlined">
                    format_align_center
                </span>
            </div>
            <div class="button">
                <span class="material-icons-outlined">
                    format_align_right
                </span>
            </div>
            <div class="button">
                <span class="material-icons-outlined">
                    format_bold
                </span>
            </div>
            <div class="button">
                <span class="material-icons-outlined">
                    format_italic
                </span>
            </div>
            <div class="button">
                <span class="material-icons-outlined">
                    format_underlined
                </span>
            </div>
        `;
    }
}