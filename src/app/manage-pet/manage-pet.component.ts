import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Patient } from '../patient-registration/patient.model';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ManagePatientService } from '../manage-patient/manage-patient.service';

@Component({
  selector: 'app-manage-pet',
  templateUrl: './manage-pet.component.html',
  styleUrls: ['./manage-pet.component.scss']
})
export class ManagePetComponent {

  phone_no = '';
  patient_name: string = '';
  searchType = '';
  patientNameList: Patient[] = [];
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
  ];
  selectedPerson: any;

  constructor(
    private manageDialog: ManagePatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (history.state && history.state.mobile_no) {
      this.reloadfromPatientUpdate();
    }
  }
  reloadfromPatientUpdate() {
    if (localStorage.getItem('searchType') === 'phone_no') {
      this.searchType = 'phone_no';
      this.phone_no = localStorage.getItem('phone_no') || '';
    } else {
      this.searchType = 'patient_name';
      this.patient_name = localStorage.getItem('patient_name')!;
    }
    this.fetchDetails();
  }
  changeSearchType() {
    this.phone_no = '';
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
    this.router.navigate(['/pet-reg'], { state: this.selectedPerson });
  }
}
