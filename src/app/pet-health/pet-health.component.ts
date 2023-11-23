import { Component } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { PetHealthService } from './pet-health.service';

@Component({
  selector: 'app-pet-health',
  templateUrl: './pet-health.component.html',
  styleUrls: ['./pet-health.component.scss']
})
export class PetHealthComponent {

  // patientHealthForm!: FormGroup;
  patientHeader: any;
  personalInfo: any;
  financialInfo: any;
  HealthInfo: any;
  vitalInfo: any;
  patientInvoiceDetail: boolean = false;
  petData: any;
  patientHeaderData: any;
  
  constructor(private is: InvoiceService, private dialog: MatDialog, private phService: PetHealthService) { }

  ngOnInit(): void {
  }

  getPatientData() {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    this.phService.getPatientData(this.patientHeader.patient_id, org_id, branch_id).subscribe(data => {
      this.petData = data;
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
