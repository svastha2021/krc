import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-schedule-table',
  templateUrl: './patient-schedule-table.component.html',
  styleUrls: ['./patient-schedule-table.component.scss']
})
export class PatientScheduleTableComponent implements OnInit {

  @Input() patientScheduleTableData: any;
  @Output() updateEmit = new EventEmitter();
  constructor(private router: Router) { }
  dataSource: any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.patientScheduleTableData);
  }

  displayedColumns: string[] = ['patient_id', 'patient_name', 'schedule_purpose', 'schedule_date', 'planned_date'];

  managePatient() {
    this.router.navigate(['manage-patient']);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
