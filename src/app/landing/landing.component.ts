import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AptBookingService } from '../apt-booking/apt-booking.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ManageDialogComponent } from '../manage-dialog/manage-dialog.component';
import { ManageAppointmentComponent } from '../manage-appointment/manage-appointment.component';
import { ManagePatientService } from '../manage-patient/manage-patient.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { UtilityService } from '../utilities/services/utility.service';
import { Subscription } from 'rxjs';
type PatientSchedule = {
  patient_id: number;
  patient_name: string;
  schedule_purpose: string;
  schedule_date: string;
  planned_date: string;
};
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  doctorList = [];
  userData: any;
  aptData: any = [];
  patientScheduleData: PatientSchedule[] = [];
  eodDate: string = '';
  eodSubscrition: Subscription | undefined;
  constructor(
    private login: LoginService,
    private dialog: MatDialog,
    private aptService: AptBookingService,
    private router: Router,
    private mp: ManagePatientService,
    private ref: ReferenceService,
    private us: UtilityService
  ) {}
  ngOnDestroy(): void {
    this.eodSubscrition?.unsubscribe();
  }

  ngOnInit(): void {
    this.userData = this.login.userData;
    this.fetchAppointments();
    this.fetchDoctorsByBranchId();

    this.eodSubscrition = this.ref.getEod().subscribe((data) => {
      this.eodDate = data;
      if (this.eodDate !== '') {
        this.fetchPatientSchedule();
      }
    });
  }

  fetchPatientSchedule() {
    this.mp.fetchPatientSchedule(this.eodDate).subscribe((data) => {
      this.patientScheduleData = data.results;
    });
  }

  fetchAppointments() {
    let currentDate = new Date();
    let appointDate =
      currentDate.getFullYear() +
      '-' +
      this.appendZero(currentDate.getMonth() + 1) +
      '-' +
      this.appendZero(currentDate.getDate());
    //this.aptData = [{"patient_id":"PATKRC002000003","patient_name":"rams","mobile_no":"7418530091","doa":"2022-04-16"}];
    this.aptService
      .getCurrentAppointments(appointDate)
      .subscribe((response: { results: any }) => {
        this.aptData = response.results;
      });
  }
  appendZero(value: any) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  }

  edit_apt(value: any) {
    console.log(value);
    this.router.navigate(['/apt-booking'], { state: value });
  }
  delete_apt(apt: any) {
    //delete service
  }

  managePatient() {
    // const dialogRef = this.dialog.open(ManageDialogComponent, {
    //   width: '300px',
    // });

    // dialogRef.afterClosed().subscribe(data => {
    //   console.log(data);
    // })
    this.router.navigate(['manage-patient']);
  }

  openAppointmentPopup() {
    const dialogRef = this.dialog.open(ManageAppointmentComponent, {
      data: this.doctorList,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.retrieveAppointments(data);
    });
  }

  retrieveAppointments(data: any) {
    this.aptService.getAppointments(data).subscribe((response) => {
      console.log(response);
      this.aptData = response.results;
    });
  }

  fetchDoctorsByBranchId() {
    this.aptService.fetchDoctors().subscribe((data) => {
      this.doctorList = data.results;
    });
  }

  goToConsult(apt: any) {
    this.router.navigate(['/doc-consult'], { state: apt });
  }
}
