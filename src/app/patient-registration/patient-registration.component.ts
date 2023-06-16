import { Component, OnInit } from '@angular/core';
import { Patient, PatientType } from './patient.model';
import { PatientRegService } from './patient_registration.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PromptDialogComponent } from '../utilities/prompt-dialog/prompt-dialog.component';
import { Router } from '@angular/router';
import { UtilityService } from '../utilities/services/utility.service';
@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit {
  updatePatient = false;
  currentDate = new Date();
  patient_id: string = '';
  patientTypes: PatientType[] = [];

  patientRegObj: Patient = {
    patient_name: '',
    dob: '',
    address: '',
    sex: '',
    email_id: '',
    mobile_no: '',
    first_visit_date: '',
    communicate_address: '',
    user_id: '',
    org_id: '',
    alt_mobile_no: '',
    aadhar_no: '',
    photo: '',
    alt_email_id: '',
    branch_id: '',
    age: '',
    blood_group: '',
    husband_name: '',
    guardian_name: '',
    guardian_type: '',
    father_name: '',
    ration_cardno: '',
    profession: '',
    attender1_name: '',
    attender1_relation_type: '',
    attender1_contact: '',
    attender2_name: '',
    attender2_relation_type: '',
    attender2_contact: '',
    pincode: '',
    reapproval: 'N',
  };
  constructor(
    private ps: PatientRegService,
    private dialog: MatDialog,
    private router: Router,
    private us: UtilityService
  ) {}

  ngOnInit(): void {
    this.fetchPatientTypes();
    if (history.state && history.state.patient_id) {
      this.patientRegObj = history.state;
      this.updatePatient = true;
      this.patient_id = history.state.patient_id;
    }
    this.convertTodayTostr();
    this.patientRegObj.branch_id = localStorage.getItem('branch_id') || '';
    this.patientRegObj.user_id = localStorage.getItem('org_id') || '';
    this.patientRegObj.org_id = localStorage.getItem('user_id') || '';
  }
  fetchPatientTypes() {
    this.ps.getPatientTypes().subscribe((data) => {
      this.patientTypes = data.results;
    });
  }

  convertTodayTostr() {
    let temp, fvDate;

    if (this.updatePatient) {
      if (this.patientRegObj.dob !== null) {
        this.us.convertTodayTostr(this.patientRegObj.dob);
        // temp = new Date(this.patientRegObj.dob);
        // this.patientRegObj.dob =
        //   temp.getFullYear() +
        //   '-' +
        //   this.appendZero(temp.getMonth() + 1) +
        //   '-' +
        //   this.appendZero(temp.getDate());
      }
      if (this.patientRegObj.first_visit_date !== null) {
        // fvDate = new Date(this.patientRegObj.first_visit_date || '');
        // let fvDate_month = this.appendZero(fvDate.getMonth() + 1);
        // this.patientRegObj.first_visit_date =
        //   fvDate.getFullYear() +
        //   '-' +
        //   fvDate_month +
        //   '-' +
        //   this.appendZero(fvDate.getDate());
        this.us.convertTodayTostr(this.patientRegObj.first_visit_date);
      }
    }
  }
  goBack() {
    if (this.updatePatient) {
      this.router.navigate(['/manage-patient'], { state: this.patientRegObj });
    } else {
      this.router.navigate(['/landing']);
    }
  }
  appendZero(value: any) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  }
  registerPatient() {
    this.ps.registerPatient(this.patientRegObj).subscribe(
      (response) => {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: 'Patient Registered successfully!!!',
        });
        this.router.navigate(['landing']);
      },
      (error) => {
        if (error.error.status === 404) {
          if (
            error.error.code === 4001 &&
            error.error.message === 'Sorry, Patient Mobile No Already Exists!.'
          ) {
            const duplicateuser = this.dialog.open(PromptDialogComponent, {
              width: '300px',
              data: 'Patient Already registered. Do you want to proceed registration?',
            });
            duplicateuser.afterClosed().subscribe((result) => {
              if (result) {
                this.patientRegObj.reapproval = 'Y';
                this.ps
                  .registerPatient(this.patientRegObj)
                  .subscribe((response) => {
                    this.dialog.open(InfoDialogComponent, {
                      width: '300px',
                      data: 'Patient Registered successfully!!!',
                    });
                    this.router.navigate(['landing']);
                  });
              }
            });
          }
        }
      }
    );
  }

  updatePatientDetails() {
    if (this.patientRegObj.first_visit_date == 'NaN-NaN-NaN') {
      this.patientRegObj.first_visit_date = null;
    }
    this.ps.updatePatient(this.patientRegObj).subscribe((data) => {
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Data Updated Successfully',
      });
      this.router.navigate(['/landing']);
    });
  }
}
