import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Patient } from '../patient-registration/patient.model';
import { ManagePatientService } from './manage-patient.service';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommonModalComponent } from '../utilities/common-modal/common-modal.component';
@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss'],
})
export class ManagePatientComponent implements OnInit {
  phone_no: any;
  patientData: any;
  patient_name: string = '';
  searchType = '';
  patientNameList: Patient[] = [];
  patientIDBarCode = '';
  dataSource = new MatTableDataSource(this.patientNameList);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  displayedColumns: string[] = [
    'radio',
    'patient_name',
    'father_name',
    'mobile_no',
    'age',
    'dob',
    'sex',
    'patient_type',
    'bar_code',
  ];
  selectedPerson: any;
  constructor(
    private manageDialog: ManagePatientService,
    private router: Router,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    if (history.state && history.state.mobile_no) {
      this.reloadfromPatientUpdate();
    }
  }
  reloadfromPatientUpdate() {
    if (localStorage.getItem('searchType') === 'phone_no') {
      this.searchType = 'phone_no';
      this.phone_no = localStorage.getItem('phone_no');
    } else {
      this.searchType = 'patient_name';
      this.patient_name = localStorage.getItem('patient_name')!;
    }
    this.fetchDetails();
  }
  changeSearchType() {
    this.phone_no = null;
    this.patient_name = '';
  }

  fetchDetails() {
    localStorage.setItem('searchType', this.searchType);
    if (this.searchType === 'phone_no') {
      localStorage.setItem('phone_no', this.phone_no);
      this.manageDialog.fetchUserData(this.phone_no).subscribe((response) => {
        if (response.results && response.results.length > 0) {
          this.patientNameList = response.results;
          this.dataSource = new MatTableDataSource(this.patientNameList);
        }
      });
    } else {
      localStorage.setItem('patient_name', this.patient_name);
      this.manageDialog.fetchUserByName(this.patient_name).subscribe(
        (response) => {
          if (response.results && response.results.length > 0) {
            this.patientNameList = response.results;
            this.dataSource = new MatTableDataSource(this.patientNameList);
          }
        },
        (error) => {
          alert('no records');
        }
      );
    }
  }

  selectUser() {
    this.router.navigate(['/patient-reg'], { state: this.selectedPerson });
  }
  
  showBarCode(patient: any) {
    let modalContent = {component:'BarcodeComponent', content:patient.patient_id}
   

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '500px',
      data:modalContent ,
    });
  }
}
