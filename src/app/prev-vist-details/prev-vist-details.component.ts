import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientVisit360ViewService } from '../patient-visit360-view/patient-visit360-view.service';

@Component({
  selector: 'app-prev-vist-details',
  templateUrl: './prev-vist-details.component.html',
  styleUrls: ['./prev-vist-details.component.scss']
})
export class PrevVistDetailsComponent implements OnInit {

  @Input() tableData: any;
  @Output() updateEmit = new EventEmitter();
  constructor(private router: Router, private formBuilder: FormBuilder, private is: InvoiceService, private dialog: MatDialog, 
    private pvService: PatientVisit360ViewService, private route: ActivatedRoute) { }
  dataSource: any;
  isShowPatientDetails: any = false;

  //patient visit
  patientHealthForm!: FormGroup;
  patientHeader: any;
  personalInfo: any;
  financialInfo: any;
  HealthInfo: any;
  vitalInfo: any;
  patientInvoiceDetail: boolean = false;
  patientData: any;
  patientHeaderData: any;
  visitData: any;
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayedColumns: string[] = ['visit_no', 'visit_date', 'view'];


  goToPatientVisit(data: any) {
    this.isShowPatientDetails = true;
    this.getPatientData(data);
    // this.router.navigate(['patient-visit360-view', data]);
  }

  getPatientData(data: any) {
    let visitNo = data.visit_no;
    let visitDate = (data.visit_date).split('T');
    this.pvService.getPatientData(data.patient_id, data.org_id, data.branch_id, visitNo, visitDate[0]).subscribe(data => {
      this.patientData = data;
    })
  }

  getPatientHeader(patientData: any) {
    this.pvService.getPatientHeader(patientData.patient_id, patientData.branch_id).subscribe(data => {
      this.patientHeaderData = data.results[0];
    })
  }

  showPatientList(result: any) {
    this.is.fetchHeader(result.patient_id).subscribe(data => {
      this.patientHeader = data;
    })
  }

    patientHeaderDetails(data: any) {
    this.patientHeader = data;
    this.patientInvoiceDetail = true;
    this.getPatientData(this.visitData);
    this.getPatientHeader(this.visitData);
  }

  printToPdf() {
    let element: HTMLElement = document.getElementById('print-section') as HTMLElement;
    element.click();
  }

  back() {
    this.isShowPatientDetails = false;
    // this.router.navigate(['doc-consult']);
  }
}