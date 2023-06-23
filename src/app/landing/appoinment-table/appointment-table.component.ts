import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit {

  @Input() tableData: any;
  @Output() updateEmit = new EventEmitter();
  constructor(private router: Router) { }
  dataSource: any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
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
