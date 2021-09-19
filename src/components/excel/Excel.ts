interface ExcelOptions {
    components: any[];
}

export class Excel {
    private $el: Element | null;
    private components: any[];

    constructor(selector: string, options: ExcelOptions) {
        this.$el = document.querySelector(selector);
        this.components = options?.components ?? [];
    }
}