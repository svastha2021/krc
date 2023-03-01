import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { UtilityService } from '../utilities/services/utility.service';
import { stockRegisterReportsService } from './stock-register-report.service';

@Component({
  selector: 'app-stock-register-report',
  templateUrl: './stock-register-report.component.html',
  styleUrls: ['./stock-register-report.component.scss']
})
export class StockRegisterReportComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;
  displayedColumns: string[] = ['transaction_date', 'product_name', 'opening_stock', 'goods_received', 'goods_sold', 'closing_stock'];
  dataSource: any;
  resultsLength = 0;
  
  constructor(private sregService: stockRegisterReportsService, private dp: DatePipe, private us: UtilityService,
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
    this.sregService.retrieveData(org_id, branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
      this.dataSource = this.reportData;
    })
  }

  export2Excel() {
    this.us.export2Excel('stock-register-table', 'stock-register.xlsx')
  }
}
