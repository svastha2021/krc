import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../invoice/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PatientVisit360ViewService } from '../patient-visit360-view/patient-visit360-view.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { DocConsultationService } from '../doc-consultation/doc-consultation.service';

@Component({
  selector: 'app-pet-visit360-view',
  templateUrl: './pet-visit360-view.component.html',
  styleUrls: ['./pet-visit360-view.component.scss']
})
export class PetVisit360ViewComponent {

  @Input() tableData: any;
  patientDetails: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private is: InvoiceService,
              private pvService: PatientVisit360ViewService, 
              private dialog: MatDialog, private route: ActivatedRoute, 
              private ref: ReferenceService,
              private docService:DocConsultationService) { }
  dataSource: any;
  isShowPatientDetails: any = false;

  //patient visit
  petHeader: any;
  personalInfo: any;
  financialInfo: any;
  HealthInfo: any;
  vitalInfo: any;
  patientInvoiceDetail: boolean = false;
  petData: any;
  patientHeaderData: any;
  visitData: any;
 
  
  ngOnInit(): void {
    let patientHeader = JSON.parse(localStorage.getItem('header')!);
    this.docService
    .fetchPrevDeatils(patientHeader.patient_id)
    .subscribe((data) => {
      console.log(data.results);
      this.dataSource = new MatTableDataSource(data.results);
      //this.setCurrentPatientData();
    });
    //this.dataSource = new MatTableDataSource(this.tableData);
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
      this.petData = data;
    })
    this.getPatientDetails(data.patient_id);
  }

  getPatientDetails(patient_id: any) {
    this.ref.fetchHeader(patient_id).subscribe(data => {
      this.patientDetails = data;
    });
  }

  getPatientHeader(petData: any) {
    this.pvService.getPatientHeader(petData.patient_id, petData.branch_id).subscribe(data => {
      this.patientHeaderData = data.results[0];
    })
  }

  showPatientList(result: any) {
    this.is.fetchHeader(result.patient_id).subscribe(data => {
      this.petHeader = data;
    })
  }

    patientHeaderDetails(data: any) {
    this.petHeader = data;
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
