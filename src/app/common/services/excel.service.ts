import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    public exportToExcel(data: any[], fileName: string): void {
        const filteredData = data.map(row => {
            const clonedRow = { ...row }; 
            delete clonedRow.payed_at;
            delete clonedRow.payed_until;
            delete clonedRow.active;
            return clonedRow;
        });
    
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, fileName + '.xlsx');
    }
}
