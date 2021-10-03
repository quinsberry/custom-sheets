enum CODES {
    A = 65,
    Z = 90,
}

function toColumn(colLetter: string, colIdx: number) {
    return `
        <div class="column" data-type="resizable" data-col="${colIdx}">
            ${colLetter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function toCell(_: string, colIdx: number) {
    return `<div class="cell" contenteditable data-col="${colIdx}"></div>`;
}

function createRow(idx: number | null, content: string) {
    const firstRowInfo = `
        <div class="row-info"></div>
    `;
    const rowInfo = `
        <div class="row-info">
            ${idx}
            <div class="row-resize" data-resize="row"></div>
        </div>
    `;
    return `
        <div class="row" ${idx ? 'data-type="resizable"' : ''}>
            ${idx === null ? firstRowInfo : rowInfo}
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