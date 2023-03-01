import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../invoice/invoice.service';
import { PatientHealthService } from './patient-health.service';

@Component({
  selector: 'app-patient-health',
  templateUrl: './patient-health.component.html',
  styleUrls: ['./patient-health.component.scss']
})
export class PatientHealthComponent implements OnInit {

  patientHealthForm!: FormGroup;
  patientHeader: any;
  personalInfo: any;
  financialInfo: any;
  HealthInfo: any;
  vitalInfo: any;
  patientInvoiceDetail: boolean = false;
  patientData: any;
  patientHeaderData: any;
  
  constructor(private formBuilder: FormBuilder, private is: InvoiceService, private dialog: MatDialog, private phService: PatientHealthService) { }

  ngOnInit(): void {
    // this.getPatientData();
  }

  getPatientData() {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    this.phService.getPatientData(this.patientHeader.patient_id, org_id, branch_id).subscribe(data => {
      this.patientData = data;
    })
  }

  getPatientHeader() {
    let branch_id = localStorage.getItem('branch_id');
    this.phService.getPatientHeader(this.patientHeader.patient_id, branch_id).subscribe(data => {
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
    this.getPatientData();
    this.getPatientHeader();
  }

  printToPdf() {
    let element: HTMLElement = document.getElementById('print-section') as HTMLElement;
    
    element.click();
  }
}