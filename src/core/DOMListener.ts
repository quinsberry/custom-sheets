import { DOM } from '@/core/dom';
import { capitalize } from '@/utils/capitalize';
import { assertNonNull } from '@/utils/type-guards';

export interface DOMListenerOptionsConfig {
    name: string;
    listeners: string[];
}

export abstract class DOMListener {
    public $root: DOM;

    private $rootName: string | null = null;
    private listeners: string[] = [];

    constructor($root: DOM, options?: DOMListenerOptionsConfig) {
        this.$root = $root;

        if (options) {
            this.$rootName = options.name;
            this.listeners = options.listeners;
        }
    }

    protected initDOMListeners() {
        this.listeners.forEach(listener => {
            const methodName = getMethodName(listener);
            // @ts-ignore ts cannot match this[methodName]
            const method: ((e: Event) => void) | null = this[methodName]?.bind(this) ?? null;
            assertNonNull(method,
                `Method "${methodName}" is not implemented for listener "${listener}" in ${this.$rootName} component.`
            );
            this.$root.on(listener, method);
        });
    }

    protected removeDOMListeners() {
    }
}

function getMethodName(eventName: string) {
    return 'on' + capitalize(eventName);
}