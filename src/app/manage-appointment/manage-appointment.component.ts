import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { doctor } from '../apt-booking/apt-booking.component';
type manageApt = {
  patient_id: boolean;
  phone_no: boolean;
  doctor_id: boolean;
  appoint_date: boolean;
};
@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.scss'],
})
export class ManageAppointmentComponent implements OnInit {
  doctorList: doctor[] = [];
  manageAppoint: any = {
    patient_id: false,
    phone_no: false,
    doctor_id: false,
    appoint_date: false,
  };
  phone_no: string = '';
  patient_id: string = '';
  appoint_date: string = '';
  doctor_id: string = '';
  selectionType: string = '';

  constructor(
    public dialogRef: MatDialogRef<ManageAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: doctor[]
  ) {}

  ngOnInit(): void {
    this.doctorList = this.data;
  }

  selectAptType(item: any) {
    let type = item;
    Object.keys(this.manageAppoint).forEach(
      (key) => (this.manageAppoint[key] = false)
    );
    this.manageAppoint[type] = true;
  }

  sendBackPayload() {
    let payload = {
      field: Object.keys(this.manageAppoint).find(
        (key) => this.manageAppoint[key] === true
      ),
      phone_no: this.phone_no,
      patient_id: this.patient_id,
      appoint_date: this.appoint_date,
      doctor_id: this.doctor_id,
    };
    this.dialogRef.close(payload);
  }
}
