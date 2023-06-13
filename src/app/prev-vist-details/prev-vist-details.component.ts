import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prev-vist-details',
  templateUrl: './prev-vist-details.component.html',
  styleUrls: ['./prev-vist-details.component.scss']
})
export class PrevVistDetailsComponent implements OnInit {

  @Input() tableData: any;
  @Output() updateEmit = new EventEmitter();
  constructor(private router: Router) { }
  dataSource: any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayedColumns: string[] = ['visit_no', 'visit_date', 'view'];


  goToPatientVisit(data: any) {
    this.router.navigate(['patient-visit360-view', data]);
  }
}
