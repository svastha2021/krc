import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  getTodayDDMMYYYYHHMM() {
    let today = new Date();
    let month = this.appendZero(today.getMonth() + 1);

    return (
      today.getDate() +
      '' +
      month +
      '' +
      today.getFullYear() +
      '' +
      today.getHours() +
      '' +
      today.getMinutes()
    );
  }

  convertTodayTostr(date?: any) {
    let temp = date ? new Date(date) : new Date();
    let month = this.appendZero(temp.getMonth() + 1);
    return (
      temp.getFullYear() + '-' + month + '-' + this.appendZero(temp.getDate())
    );
  }
  convertTodayTostrDDMMYYYY(date?: any) {
    let temp = date ? new Date(date) : new Date();
    let month = this.appendZero(temp.getMonth() + 1);
    return (
      this.appendZero(temp.getDate()) + '-' + month + '-' + temp.getFullYear()
    );
  }
  appendZero(value: any) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  }

  convertDate(test_date: any) {
    return this.convertTodayTostr(test_date);
  }

  export2Excel(elementId: string, fileName: string) {
    let keyRemoval = '';
    /* pass here the table id */
    let element = document.getElementById(elementId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    Object.keys(ws).find((key) => {
      if (ws[key]?.t && ws[key]?.t === 'z' && ws[key].v === '') {
        let num = key.match(/\d+/g);
        let letr = key.match(/[a-zA-Z]+/g);
        keyRemoval = letr![0] + (parseInt(num![0]) + 1);
        delete ws[keyRemoval];
      }
    });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  exportArrayToExcel(arr: any[], name?: string) {
    // let { sheetName, fileName } = this.getFileName(name);

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, name);
    XLSX.writeFile(wb, `${name}.xlsx`);
  }

  removeUnleadingPeriod(str: string) {
    if (str.indexOf('.') > 0) {
      return str.replace('.', '');
    }
    return str;
  }
}
