import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MedPreparationService } from './med-prescription.service';
import { UtilityService } from '../utilities/services/utility.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

export interface LabItem {
  id?: any;
  bu_id?: string;
  product_id?: string;
  medicine_id: string;
  morning_bf?: number;
  morning_af?: number;
  noon_bf?: number;
  noon_af?: number;
  evening_bf?: number;
  evening_af?: number;
  night_bf?: number;
  night_af?: number;
  other_time_desc?: string;
  other_time_bf?: number;
  other_time_af?: number;
  no_of_days: number;
  remarks?: string;
}

@Component({
  selector: 'app-med-prescription',
  templateUrl: './med-prescription.component.html',
  styleUrls: ['./med-prescription.component.scss']
})
export class MedPrescriptionComponent implements OnInit {
  @Input()
  headerDetail: any;
  @Input()
  visit_no: any;
  @Input() aptObj: any;
  @Output() isActiveMedicine = new EventEmitter();
  pharmaList: any = [];
  tableData: LabItem[] = [];

  previousData: LabItem[] = [];
  labPayload = {};
  eod: any;
  medicineBoolean:boolean = false;

  constructor(private mpService: MedPreparationService,
    private utility: UtilityService, private dialog: MatDialog,
    private fb: FormBuilder, private ref: ReferenceService) { }

  ngOnInit(): void {
    this.ref.getEodDetailData().subscribe(data => {
      this.eod = data.results[0].eod_date;
      this.mpService.fetchProducts('PHARM', this.eod).subscribe(data => {
        this.pharmaList = data.results;
      });
    })


    this.mpService.fetchLastPharmaDetails(this.headerDetail.patient_id).subscribe(data => {
      this.previousData = data.results;
      this.tableData = this.previousData

    }, error => {
      // this.dialog.open(InfoDialogComponent, {
      //   width: '500px',
      //   data: 'No data found'
      // })
    })
  }

  addRecord() {
    this.tableData.push({
      id: this.tableData.length,
      medicine_id: '',
      morning_bf: 0,
      morning_af: 0,
      noon_bf: 0,
      noon_af: 0,
      evening_bf: 0,
      evening_af: 0,
      night_bf: 0,
      night_af: 0,
      other_time_desc: '',
      other_time_bf: 0,
      other_time_af: 0,
      no_of_days: 0,
      remarks: ''
    })
  }

  delete_item(item: any) {
    this.tableData.splice(item.id, 1);

  }

  updateLabDetails() {
    this.labPayload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "doctor_id": localStorage.getItem('user_id'),
      "user_id": localStorage.getItem('user_id'),
      "business_id": "",
      "visit_no": this.visit_no,
      "pharm_lists": this.tableData
    }

    this.mpService.updatePharmaDetails(this.labPayload).subscribe(data => {
      this.medicineBoolean = true;
      this.emitMedicine();
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Pharma Details Saved Successfully'
      })
    })
  }
  showPreviousTable = false;
  displayPrevious() {
    this.showPreviousTable = true;
  }

  emitMedicine() {
    this.isActiveMedicine.emit(
      [this.medicineBoolean,this.visit_no]
    );
  }
}





