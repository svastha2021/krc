import { Component, OnInit } from '@angular/core';
import { PatientScheduleService } from './patient-schedule.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from '../utilities/services/utility.service';
import { ReferenceService } from '../utilities/services/reference.service';

export interface scheduleItem {
  schedule_date: string;
  schedule_purpose: string;
  visit_flag: string;
  planned_date: string;
  schedule_num?: any;
  actual_date: string;
  bu_id: string;
  org_id: string;
  patient_id: string;
  branch_id: string;
  schedule_ver: number;
}

@Component({
  selector: 'app-patient-schedule',
  templateUrl: './patient-schedule.component.html',
  styleUrls: ['./patient-schedule.component.scss'],
})
export class PatientScheduleComponent implements OnInit {
  showScheduleForm = false;  
  scheduleRef: any = [];
  insSummaryForm!: FormGroup;
  headerDetail: any;
  patientHistory = [];
  tableData: scheduleItem[] = [];
  schType: any = [];

  constructor(
    private ps: PatientScheduleService,
    private us: UtilityService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ref: ReferenceService
  ) {}

  ngOnInit(): void {    
    this.fetchPatientScheduleRef();
    this.ps.getSchTypes('SCHTYP').subscribe((data) => {
      this.schType = data.results;
    });
    this.insSummaryForm = this.formBuilder.group({
      bu: ['', []],
      month: ['', []],
      year: ['', []],
    });
    this.setDefaultValues();
  }  

  fetchPatientScheduleRef() {
    this.ref.getSchedule().subscribe((data) => {
      this.scheduleRef = data.results;
    });
  }
  setDefaultValues() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    this.insSummaryForm.get('month')?.setValue(month);
    this.insSummaryForm.get('year')?.setValue(year);
    this.insSummaryForm.get('bu')?.setValue('DIALY');
  }

  patientHeader(data: any) {
    this.headerDetail = data;
    let bu = 'DIALY';
    let month = this.insSummaryForm.value.month;
    let year = this.insSummaryForm.value.year;
    this.ps
      .fetchPrevDeatils(this.headerDetail.patient_id, bu, month, year)
      .subscribe((data) => {
        this.tableData = data.results;
        this.showScheduleForm = true;
      });
  }
  changeMonth() {
    this.tableData = [];
    this.getInsuSummay();
  }
  getInsuSummay() {
    let bu = this.insSummaryForm.value.bu;
    let month = this.insSummaryForm.value.month;
    let year = this.insSummaryForm.value.year;
    this.ps
      .fetchPrevDeatils(this.headerDetail.patient_id, bu, month, year)
      .subscribe((data) => {
        this.tableData = data.results;
        if (this.tableData.length === 0) {
          this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'No Schedule found',
          });
        }
      });
  }

  addRecord() {
    let month = this.insSummaryForm.value.month;
    let year = this.insSummaryForm.value.year;

    this.tableData.push({
      schedule_date: year + '-' + this.us.appendZero(month) + '-' + '01',
      schedule_purpose: '',
      visit_flag: 'S',
      planned_date: '',
      actual_date: '',
      bu_id: this.insSummaryForm.value.bu,
      schedule_ver: 1,
      org_id: localStorage.getItem('org_id')!,
      branch_id: localStorage.getItem('branch_id')!,
      patient_id: this.headerDetail.patient_id,
    });
  }

  updateDetails() {
    let payload = {
      bu_id: this.insSummaryForm.value.bu,
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      patient_id: this.headerDetail.patient_id,
      user_id: localStorage.getItem('user_id'),
      schedule_lists: this.tableData,
    };

    this.ps.updateDetails(payload).subscribe((data) => {
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Schedule Details Saved Successfully',
      });
      this.getInsuSummay();
    });
  }

  delete_item(item: any) {
    this.tableData.splice(item, 1);
  }
}
