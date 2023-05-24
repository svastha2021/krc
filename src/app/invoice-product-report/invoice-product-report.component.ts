import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { InvoiceProductReportService } from './invoice-product-report.service';

@Component({
  selector: 'app-invoice-product',
  templateUrl: './invoice-product-report.component.html',
  styleUrls: ['./invoice-product-report.component.scss'],
})
export class InvoiceProductReportComponent implements OnInit {
  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  constructor(
    private dp: DatePipe,
    private us: UtilityService,
    private dateAdapter: DateAdapter<Date>,
    private invPayService: InvoiceProductReportService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {}

  getReports() {
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.invPayService.retrieveData(from_date, to_date).subscribe((data) => {
      let results = data.results;
      this.reportData = [...results];
    });
  }

  export2Excel() {
    this.us.export2Excel('collectionwise-table', 'collectionwise.xlsx');
  }
}
