import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doctor } from 'src/app/apt-booking/apt-booking.component';
import { AptBookingService } from 'src/app/apt-booking/apt-booking.service';
import { ManageAppointmentComponent } from 'src/app/manage-appointment/manage-appointment.component';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit {

  @Input()
  set appointmentTableData(value: any) {
    console.log(value);
    this.dataSource.data = value;   
  }
  @Output() updateEmit = new EventEmitter();

  dataSource = new MatTableDataSource(this.appointmentTableData);
  doctorList: doctor[] = [];
  constructor(private router: Router, private dialog: MatDialog,
    private aptService: AptBookingService,) { }
  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.appointmentTableData);
  }

  openAppointmentPopup() {
    const dialogRef = this.dialog.open(ManageAppointmentComponent, {
      data: this.doctorList,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.retrieveAppointments(data);
    });
  }

  retrieveAppointments(data: any) {
    this.aptService.getAppointments(data).subscribe((response) => {
      this.dataSource.data = response.results;
    });
  }

  displayedColumns: string[] = ['patient_id', 'patient_name', 'phone_no', 'appoint_date', 'appoint_no', 'doctor_name', 'action', 'consult'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  edit_apt(value: any) {
    this.router.navigate(['/apt-booking'], { state: value });
  }

  goToConsult(apt: any) {
    this.router.navigate(['/doc-consult'], { state: apt });
  }

}
