import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
import { UpdatePayreceiptsService } from './update-payreceipts.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PrTableComponent } from './pr-table/pr-table.component';

interface payreceipt {

  "org_id": string,
  "branch_id": string,
  "trans_id": string,
  "account_type": string,
  "account_code": string,
  "trans_date": string,
  "account_value": number,
  "trans_narration": string,
  "addl_remarks": string,
  "voucher_num": string,
  "voucher_date": string,
  "rp_for": string,
  "rp_name_id": string,
  "rp_name_other": string,
  "payment_mode": string,
  "payment_ref": string,
  "updated_by": string,
  "updated_date": string,
  "created_by": string,
  "created_date": string

}
@Component({
  selector: 'app-update-payreceipts',
  templateUrl: './update-payreceipts.component.html',
  styleUrls: ['./update-payreceipts.component.scss'],
  providers: [DatePipe]
})
export class UpdatePayreceiptsComponent implements OnInit {

  today = new Date();
  reportData: payreceipt[] = [];
  from_date: any ='';
  to_date: any ='';
  trans_type: any;
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  dataSource = new MatTableDataSource(this.reportData);
  displayedColumns: string[] = ['trans_id','account_value','rp_name_other','trans_narration','action' ];
  constructor(private dp: DatePipe, private updateprService: UpdatePayreceiptsService,
    private us: UtilityService, private dateAdapter: DateAdapter<Date>, private route: ActivatedRoute, private router: Router) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.route.paramMap.forEach(data => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    if (this.updateprService.inputPayload.type) {
      this.trans_type = this.updateprService.inputPayload.type;
      this.from_date = this.updateprService.inputPayload.from_date;
      this.to_date = this.updateprService.inputPayload.to_date;
      this.getReports();
    }
    this.getEOD();

  }
  searchText = '';
  

  getReports() {

    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.updateprService.retrieveData(from_date, to_date, this.trans_type).subscribe(data => {
      this.reportData = data.results;
      this.dataSource = data.results; 
    })
  }

  update(item: payreceipt) {
    this.updateprService.inputPayload.from_date = this.from_date;
    this.updateprService.inputPayload.to_date = this.to_date;
    this.updateprService.inputPayload.type = this.trans_type;
    this.updateprService.reportData = this.reportData;
    this.router.navigate(['/payment-receipts'], { state: item });
  }
  eod: any;

  getEOD() {
    this.updateprService.getEodDetailData().subscribe(data => {
      this.eod = data.results[0].eod_date

    })
  }
  changeType(){
    this.reportData = [];
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }




}
