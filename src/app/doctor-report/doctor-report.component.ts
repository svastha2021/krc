import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DoctorReportService } from './doctor-report.service';
import * as XLSX from 'xlsx';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-doc-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.scss'],
  providers: [DatePipe]
})
export class DoctorReportComponent implements OnInit {
  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  fileName = 'PatientWise.xlsx';
  constructor(private dp: DatePipe, private docReportService: DoctorReportService,
    private us: UtilityService, private dateAdapter:DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
     }

  ngOnInit(): void {
    // this.reportData = [{ "inv_date": "2022-07-04T00:00:00.000Z", "normal_inv_cnt": 1, "normal_amt": 2600, "normal_recd": 2600, "normal_os": 0, "cmcare_inv_cnt": 4, "cmcare_amt": 10400, "cmcare_recd": 10400, "cmcare_os": 0, "work_inv_cnt": 0, "work_amt": 0, "work_recd": 0, "work_os": 0, "pens_inv_cnt": 0, "pens_amt": 0, "pens_recd": 0, "pens_os": 0, "corp_inv_cnt": 0, "corp_amt": 0, "corp_recd": 0, "corp_os": 0, "ckh_inv_cnt": 0, "ckh_amt": 0, "ckh_recd": 0, "ckh_os": 0, "tot_inv_cnt": 5, "tot_inv_amt": 13000, "tot_recd": 13000, "tot_os": 0 }, { "inv_date": "2022-07-05T00:00:00.000Z", "normal_inv_cnt": 21, "normal_amt": 53250, "normal_recd": 45350, "normal_os": 7900, "cmcare_inv_cnt": 10, "cmcare_amt": 13000, "cmcare_recd": 13000, "cmcare_os": 0, "work_inv_cnt": 6, "work_amt": 9600, "work_recd": 8501, "work_os": 1099, "pens_inv_cnt": 4, "pens_amt": 8600, "pens_recd": 8600, "pens_os": 0, "corp_inv_cnt": 4, "corp_amt": 8400, "corp_recd": 6250, "corp_os": 2150, "ckh_inv_cnt": 2, "ckh_amt": 8100, "ckh_recd": 8100, "ckh_os": 0, "tot_inv_cnt": 47, "tot_inv_amt": 100950, "tot_recd": 89801, "tot_os": 11149 }, { "inv_date": "2022-07-06T00:00:00.000Z", "normal_inv_cnt": 19, "normal_amt": 36206, "normal_recd": 33306, "normal_os": 2900, "cmcare_inv_cnt": 5, "cmcare_amt": 8850, "cmcare_recd": 6850, "cmcare_os": 2000, "work_inv_cnt": 7, "work_amt": 9300, "work_recd": 8000, "work_os": 1300, "pens_inv_cnt": 0, "pens_amt": 0, "pens_recd": 0, "pens_os": 0, "corp_inv_cnt": 6, "corp_amt": 15350, "corp_recd": 15350, "corp_os": 0, "ckh_inv_cnt": 7, "ckh_amt": 16950, "ckh_recd": 7800, "ckh_os": 9150, "tot_inv_cnt": 44, "tot_inv_amt": 86656, "tot_recd": 71306, "tot_os": 15350 }, { "inv_date": "2022-07-07T00:00:00.000Z", "normal_inv_cnt": 16, "normal_amt": 37500, "normal_recd": 37500, "normal_os": 0, "cmcare_inv_cnt": 14, "cmcare_amt": 25350, "cmcare_recd": 11850, "cmcare_os": 13500, "work_inv_cnt": 14, "work_amt": 23010, "work_recd": 23010, "work_os": 0, "pens_inv_cnt": 14, "pens_amt": 24850, "pens_recd": 12850, "pens_os": 12000, "corp_inv_cnt": 6, "corp_amt": 10800, "corp_recd": 10800, "corp_os": 0, "ckh_inv_cnt": 7, "ckh_amt": 13200, "ckh_recd": 2650, "ckh_os": 10550, "tot_inv_cnt": 71, "tot_inv_amt": 134710, "tot_recd": 98660, "tot_os": 36050 }, { "inv_date": "2022-07-08T00:00:00.000Z", "normal_inv_cnt": 12, "normal_amt": 19100, "normal_recd": 19100, "normal_os": 0, "cmcare_inv_cnt": 3, "cmcare_amt": 6400, "cmcare_recd": 6400, "cmcare_os": 0, "work_inv_cnt": 9, "work_amt": 15000, "work_recd": 8900, "work_os": 6100, "pens_inv_cnt": 2, "pens_amt": 6400, "pens_recd": 6400, "pens_os": 0, "corp_inv_cnt": 18, "corp_amt": 25000, "corp_recd": 25000, "corp_os": 0, "ckh_inv_cnt": 4, "ckh_amt": 6650, "ckh_recd": 4000, "ckh_os": 2650, "tot_inv_cnt": 48, "tot_inv_amt": 78550, "tot_recd": 69800, "tot_os": 8750 }];


  }

  getReports() {
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.docReportService.retrieveData(from_date, to_date).subscribe(data => {
      this.reportData = data.results;
      this.export();
    })
  }

  export(){
    this.us.exportArrayToExcel(this.reportData, "DoctorReport");
}

}
