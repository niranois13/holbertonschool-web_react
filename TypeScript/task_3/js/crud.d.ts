import { RowElement } from './interface';

export declare function insertRow(row: RowElement): number;
export declare function deleteRow(rowId: number): void;
export declare function updateRow(rowId: number, row: RowElement): number;