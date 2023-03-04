import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { goodsReportsService } from './goods-reports.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ListTable } from '../patient-listing-report/list-table/list-table.component';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-goods-reports',
  templateUrl: './goods-reports.component.html',
  styleUrls: ['./goods-reports.component.scss']
})
export class GoodsReportsComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;
  displayedColumns: string[] = ['supplier_name', 'po_no', 'po_date', 'supplier_inv_no', 'supplier_inv_date', 'item_description', 'po_qty_ordered', 'supplier_qty', 'balance_qty', 'gr_status'];
  // dataSource: any;
  resultsLength = 0;

  dataSource = new MatTableDataSource(this.reportData);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;

  constructor(private grService: goodsReportsService, private dp: DatePipe, private us: UtilityService,
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
    this.grService.retrieveData(org_id, branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
      this.dataSource = this.reportData;
      this.resultsLength = this.reportData.length;
    })
  }

  export2Excel() {
    this.us.export2Excel('goods-table', 'goods.xlsx')
  }
}
