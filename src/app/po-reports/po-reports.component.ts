import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PoReportsService } from './po-reports.service';
import { DateAdapter } from '@angular/material/core';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-po-reports',
  templateUrl: './po-reports.component.html',
  styleUrls: ['./po-reports.component.scss']
})
export class PoReportsComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;

  constructor(private poRepService: PoReportsService, private dp: DatePipe,
    private dateAdapter:DateAdapter<Date>, private us: UtilityService) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }

  getReports() {
    const branchId = localStorage.getItem('branch_id');
    const org_id = localStorage.getItem('org_id');
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.poRepService.retrieveData(org_id, branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
    })
  }

  export2Excel() {
    this.us.export2Excel('po-table', 'po.xlsx')
  }
}
