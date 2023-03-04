import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { UtilityService } from '../utilities/services/utility.service';
import { supplierReportsService } from './supplier-reports.service';

@Component({
  selector: 'app-supplier-reports',
  templateUrl: './supplier-reports.component.html',
  styleUrls: ['./supplier-reports.component.scss']
})
export class SupplierReportsComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;
  displayedColumns: string[] = ['supplier_name', 'po_no', 'po_date', 'supplier_inv_no', 'supplier_inv_date', 'supplier_inv_amt', 'supplier_inv_paid', 'supplier_inv_bal', 'payment', 'payment_dt', 'payment_mode', 'remarks'];
  dataSource: any;
  resultsLength = 0;
  
  constructor(private srService: supplierReportsService, private dp: DatePipe, private us: UtilityService,
    private dateAdapter:DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }
  getReports() {
    const branchId = localStorage.getItem('branch_id');
    const org_id = localStorage.getItem('org_id');
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.srService.retrieveData(org_id, branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
      this.dataSource = this.reportData;
    })
  }

  export2Excel() {
    this.us.export2Excel('supplier-table', 'supplier.xlsx')
  }

}
