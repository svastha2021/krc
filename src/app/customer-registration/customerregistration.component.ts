import { Component, OnInit } from '@angular/core';
import { Patient, PatientType } from './customer.model';
import { PatientRegService } from './customer_registration.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PromptDialogComponent } from '../utilities/prompt-dialog/prompt-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {
  updatePatient = false;
  currentDate = new Date();
  patient_id: string = '';
  patientTypes: PatientType[] = [];

  patientRegObj: Patient = {
    patient_name: '', dob: '', address: '', email_id: '', mobile_no: '', 
    communicate_address: '', user_id: '', org_id: '', alt_mobile_no: '',
     branch_id: '',   
    
    pincode: '', reapproval: 'N'

  };
  constructor(private ps: PatientRegService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.fetchPatientTypes();
    if (history.state && history.state.patient_id) {
      this.patientRegObj = history.state;
      this.updatePatient = true;
      this.patient_id = history.state.patient_id;
    }
    this.convertTodayTostr();
    const branch = localStorage.getItem('branch_id');
    const org_id = localStorage.getItem('org_id');
    const user = localStorage.getItem('user_id')
    this.patientRegObj.branch_id = branch || '';
    this.patientRegObj.user_id = user || '';
    this.patientRegObj.org_id = org_id || '';
  }
  fetchPatientTypes() {
    this.ps.getPatientTypes().subscribe(data => {
      this.patientTypes = data.results;
    })
  }


  convertTodayTostr() {
    let temp, fvDate;

    if (this.updatePatient) {
      if(this.patientRegObj.dob !== null){
        temp = new Date(this.patientRegObj.dob);
        this.patientRegObj.dob = temp.getFullYear() + '-' + this.appendZero(temp.getMonth() + 1) + '-' + this.appendZero(temp.getDate());
      }
       
           
    }

  }
  goBack() {
    if (this.updatePatient) {
      this.router.navigate(['/manage-patient'], { state: this.patientRegObj })
    } else {
      this.router.navigate(['/landing'])
    }

  }
  appendZero(value: any) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  }
  registerPatient() {
    // this.patientRegObj.updated_date = '2021-06-23';
    this.ps.registerPatient(this.patientRegObj).subscribe(response => {
      //alert('Patient Registered successfully!!!')
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Patient Registered successfully!!!'
      })
      this.router.navigate(['landing']);
    }, error => {
      if (error.error.status === 404) {
        if (error.error.code === 4001 && error.error.message === 'Sorry, Patient Mobile No Already Exists!.') {
          const duplicateuser = this.dialog.open(PromptDialogComponent, {
            width: '300px',
            data: 'Patient Already registered. Do you want to proceed registration?'
          });
          duplicateuser.afterClosed().subscribe(result => {
            if (result) {
              this.patientRegObj.reapproval = 'Y';
              this.ps.registerPatient(this.patientRegObj).subscribe(response => {
                //alert('Patient Registered successfully!!!')
                this.dialog.open(InfoDialogComponent, {
                  width: '300px',
                  data: 'Patient Registered successfully!!!'
                })
                this.router.navigate(['landing']);
              })
            }
          })
        }
      }
    });
  }


  updatePatientDetails() {
   
    this.ps.updatePatient(this.patientRegObj).subscribe(data => {
      //alert('updated');
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Data Updated Successfully'
      })
      this.router.navigate(['/landing'])
    })
  }
}
