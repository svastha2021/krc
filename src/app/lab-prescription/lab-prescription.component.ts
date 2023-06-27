import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LabPreparationService } from './lab-preparation.service';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ReferenceService } from '../utilities/services/reference.service';
@Component({
  selector: 'app-lab-prescription',
  templateUrl: './lab-prescription.component.html',
  styleUrls: ['./lab-prescription.component.scss']
})
export class LabPrescriptionComponent implements OnInit {
  @Input()
  headerDetail: any;
  @Input()
  visit_no: string = '';
  labTest: LabItem[] = [];
  displayedColumns = ['id', 'test_id', 'test_date', 'test_notes', 'action'];
  labPayload = {};
  previousLabDetails: LabTestItem[] = [];
  eod: any;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  showPreviousTable: boolean = false;

  constructor(private lpService: LabPreparationService,
    private utility: UtilityService, private dialog: MatDialog,
    private ref: ReferenceService) { }

  ngOnInit(): void {
    // this.visit_no = '2';
    this.ref.getEodDetailData().subscribe(data => {
      this.eod = data.results[0].eod_date;
      this.lpService.fetchProducts(this.eod).subscribe(data => {
        this.labTest = data.results;
      });
    })
    this.lpService.fetchLastLabDetails(this.headerDetail.patient_id).subscribe(data => {
      this.previousLabDetails = data.results;
      this.dataSource.data = this.previousLabDetails
      this.previousLabDetails.forEach((item, index) => {
        item.id = index;
        item.test_date = this.convertDate(item.test_date)
      })
    }, error => {
      // this.dialog.open(InfoDialogComponent, {
      //   width: '500px',
      //   data: 'No data found'
      // })
    })
  }
  convertDate(test_date: any) {
    return this.utility.convertTodayTostr(test_date);

  }
  addRecord() {
    let length = this.dataSource.data.length;
    this.dataSource.data.push({
      id: this.dataSource.data.length, test_id: '', test_date: '', test_notes: ''
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.table?.renderRows();
  }

  delete_item(item: any) {
    let dataArray = this.dataSource.data;

    dataArray.splice(item.id, 1);

    this.dataSource.data = dataArray;
    this.dataSource = new MatTableDataSource(this.dataSource.data);

    this.table?.renderRows();

  }
  labTestPayload = [];
  resetScreen() {
    this.dataSource.data = [];

  }
  updateLabDetails() {

    // this.dataSource.data.forEach(item => {
    //   let labItem = { test_id: '', test_notes: '', test_date: '' };
    //   labItem.test_id = item.product_name;
    //   labItem.test_date = item
    // })

    this.labPayload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "doctor_id": localStorage.getItem('user_id'),
      "user_id": localStorage.getItem('user_id'),
      "business_id": "",
      "visit_no": this.visit_no,
      "lab_lists": this.dataSource.data
    }

    this.lpService.updateLabDetails(this.labPayload).subscribe(data => {
      this.resetScreen();
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Lab Details Saved Successfully'
      })
    })
  }

  displayPrevious() {
    this.showPreviousTable = true;
  }


}



export interface LabItem {
  id?: any;
  bu_id?: string;
  product_id?: string;
  product_name: string;
  visit_date?: string;
  remarks: string;
}


export interface LabTestItem {
  id?: any;
  test_id: string;
  test_date: string;
  test_notes: string;
}
const ELEMENT_DATA: LabTestItem[] = [];
