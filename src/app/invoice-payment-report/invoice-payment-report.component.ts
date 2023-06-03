import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { InvoicePaymentReportService } from './invoice-payment-report.service';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment-report.component.html',
  styleUrls: ['./invoice-payment-report.component.scss'],
})
export class InvoicePaymentReportComponent implements OnInit {
  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;

  dataSource: any;
  sort: MatSort = new MatSort();
  displayedColumns = [
    'inv_date',
    'invoice_no',
    'patient_name',
    'patient_type',
    'bu_id',
    'base_cost',
    'tot_charges',
    'gross_inv_amount',
    'gross_discount',    
    'net_amount',
    'net_paid',
    'net_balance',    
    'payment_amount',
    'pay_mode',
    'payment_date'
  ];
  constructor(
    private dp: DatePipe,
    private us: UtilityService,
    private dateAdapter: DateAdapter<Date>,
    private invPayService: InvoicePaymentReportService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.reportData);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getReports() {
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.invPayService.retrieveData(from_date, to_date).subscribe((data) => {
      this.dataSource.data = data.results;
    });
  }

  export() {
    this.us.exportArrayToExcel(this.dataSource.data, 'patientListing');
  }
}
