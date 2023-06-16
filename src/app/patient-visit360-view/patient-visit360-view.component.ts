import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../invoice/invoice.service';
import { PatientVisit360ViewService } from './patient-visit360-view.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-visit360-view',
  templateUrl: './patient-visit360-view.component.html',
  styleUrls: ['./patient-visit360-view.component.scss']
})
export class PatientVisit360ViewComponent implements OnInit {

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
  
  constructor(private formBuilder: FormBuilder, private is: InvoiceService, private dialog: MatDialog, 
    private pvService: PatientVisit360ViewService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(data => {
      if (data) {
        this.visitData = data;
        // this.getPatientData(data);
      }
    })
   }

  ngOnInit(): void {
    // this.getPatientHeader(this.visitData);
    this.getPatientData(this.visitData);
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
    this.router.navigate(['doc-consult']);
  }
}