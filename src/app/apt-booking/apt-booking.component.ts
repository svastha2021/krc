import { Component, Inject, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { HttpClient } from '@angular/common/http';
import { AptBookingService } from './apt-booking.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PatientHeader } from '../patient-header/patient-header.service';
import { UtilityService } from '../utilities/services/utility.service';

export interface doctor {
  doctor_name: string;
  doctor_id: string;
}

export type Dept = {
  org_id: string;
  branch_id: string;
  dept_id: string;
  dept_name: string;
  dept_OPendate: string;
  dept_address: string;
  dept_contact_num: null;
  dept_email_id: string;
  dept_cont_pers: string;
  department_cont_pers_Phone: string;
  department_cont_pers_Email: string;
  updated_by: string;
  updated_date: string;
  created_by: string;
  created_date: string;
};
export type AptStatus = {
  ref_type: string;
  ref_code: string;
  ref_desc: string;
};

@Component({
  selector: 'app-apt-booking',
  templateUrl: './apt-booking.component.html',
  styleUrls: ['./apt-booking.component.scss'],
})
export class AptBookingComponent implements OnInit {
  headerDetailData!: PatientHeader;
  headerDetail = false;
  updateApt = false;
  doctorList: doctor[] = [];
  aptObj: Appointment = {
    patient_name: '',
    patient_id: '',
    appoint_date: new Date(),
    dept_id: '',
    doctor_id: '',
    phone_no: '',
    ailment: '',
  };
  updateAppointObj: Appointment = {
    patient_id: '',
    appoint_date: new Date(),
    phone_no: '',
  };
  fetchData = { patient_id: '', patient_name: '' };
  currentDate = new Date();
  dept: Dept[] = [];
  aptStatusList: AptStatus[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private aptService: AptBookingService,
    private us: UtilityService
  ) {}

  ngOnInit(): void {
    this.aptObj.appoint_date = this.us.convertTodayTostr();
    this.fetchDepartments();
    //this.fetchDoctorsByBranchId();
  }

  patientHeaderData(data: any) {
    this.headerDetail = true;
    this.headerDetailData = data;
    this.aptObj.patient_id = data.patient_id;
    this.aptObj.patient_name = data.patient_name;
    this.aptObj.phone_no = data.mobile_no;
  }

  fetchDepartments() {
    this.aptService.fetchDepartments().subscribe((data) => {
      this.dept = data.results;
      if (history.state && history.state.phone_no) {
        this.aptObj = history.state;
        this.fetchDoctorsByDept();
        this.fetchStatus();
        this.updateApt = true;
      }
    });
  }
  fetchStatus() {
    this.aptService.getAppointmentStatus().subscribe((data) => {
      this.aptStatusList = data.results;
    });
  }
  fetchDoctorsByDept(dept?: any) {
    

    this.aptService
      .fetchDoctorsByDept(this.aptObj.dept_id)
      .subscribe((data) => {
        this.doctorList = data.results;
        if (dept) {
          this.aptObj.doctor_id = '';
        }
      });
  }
  patientAvailable = false;
  // fetchUser() {
  //   const mobile_no = this.aptObj.phone_no;
  //   this.aptService.fetchUserData(this.aptObj.phone_no).subscribe(
  //     (response) => {
  //       let result = response.results;
  //       console.log(result);
  //       this.showPatientList(result);
  //     },
  //     (error) => {
  //       if (error.error.status === 404) {
  //         //alert(error.error.message);
  //         const dialogRef = this.dialog.open(InfoDialogComponent, {
  //           width: '500px',
  //           data: error.error.message,
  //         });
  //       }
  //     }
  //   );
  // }
  // showPatientList(result: any) {
  //   const dialogRef = this.dialog.open(DialogPatientList, {
  //     width: '500px',
  //     data: result,
  //   });

  //   dialogRef.afterClosed().subscribe((data) => {
  //     this.aptObj.patient_id = data.patient_id;
  //     this.aptObj.patient_name = data.patient_name;
  //   });
  // }

  updateAppointment() {
    this.aptObj.branch_id = localStorage.getItem('branch_id') || undefined;
    this.aptObj.org_id = localStorage.getItem('org_id') || undefined;

    this.aptService.updateApt(this.aptObj).subscribe((response) => {
      this.aptObj = {
        patient_name: '',
        patient_id: '',
        appoint_date: new Date(),
        doctor_id: '',
        phone_no: '',
        ailment: '',
      };

      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Appointment Updated',
      });
      this.router.navigate(['landing']);
    });
  }
  bookApt() {
    console.log(this.aptObj);
    this.aptObj.branch_id = localStorage.getItem('branch_id') || undefined;
    this.aptObj.org_id = localStorage.getItem('org_id') || undefined;
    // this.aptObj.appointment_time = '09:02:44';
    this.aptService.bookApt(this.aptObj).subscribe(
      (response) => {
        this.aptObj = {
          patient_name: '',
          patient_id: '',
          appoint_date: new Date(),
          doctor_id: '',
          dept_id: '',
          phone_no: '',
          ailment: '',
        };

        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: 'Appointment Booked',
        });
        this.router.navigate(['landing']);
      },
      (error) => {
        if (error.error.status === 404) {
          //alert(error.error.message);
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: error.error.message,
          });
        }
      }
    );
  }
  goBack() {
    this.router.navigate(['/landing']);
  }
}
export interface PatientDialogData {
  patient_id: '';
  patient_name: '';
}
@Component({
  selector: 'dialog-patient-list',
  templateUrl: 'dialog-patient-list.html',
  styleUrls: ['dialog-patient.scss'],
})
export class DialogPatientList implements OnInit {
  patientList: PatientDialogData[] = [];
  selectedPatient: any;
  constructor(
    public dialogRef: MatDialogRef<DialogPatientList>,
    @Inject(MAT_DIALOG_DATA) public data: PatientDialogData[]
  ) {}
  ngOnInit() {
    this.patientList = this.data;
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
