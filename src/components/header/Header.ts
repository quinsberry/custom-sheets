import { ExcelComponent } from '@/core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    toHTML(): string {
        return `
            <input type="text" class="input" value="New table">

            <div>
                <div class="button">
                    <span class="material-icons-outlined">
                        logout
                    </span>
                </div>
                <div class="button">
                    <span class="material-icons-outlined">
                        delete
                    </span>
                </div>
            </div>
        `;
    }
}