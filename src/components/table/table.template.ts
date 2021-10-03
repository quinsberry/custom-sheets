enum CODES {
    A = 65,
    Z = 90,
}

function toColumn(colLetter: string) {
    return `<div class="column">${colLetter}</div>`;
}

function toCell() {
    return `<div class="cell" contenteditable></div>`;
}

function createRow(idx: number | null, content: string) {
    return `
        <div class="row">
            <div class="row-info">${idx ?? ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_: string, idx: number): string {
    return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const colsLetters = new Array(colsCount).fill('').map(toChar);
    const cols = colsLetters.map(toColumn).join('');
    const cells = colsLetters.map(toCell).join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}