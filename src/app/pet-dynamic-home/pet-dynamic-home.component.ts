import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AptStatus } from '../apt-booking/apt-booking.component';
import { aptModel } from '../apt-booking/apt-booking.service';
import { DocConsultationService } from '../doc-consultation/doc-consultation.service';

@Component({
  selector: 'app-pet-dynamic-home',
  templateUrl: './pet-dynamic-home.component.html',
  styleUrls: ['./pet-dynamic-home.component.scss'],
})
export class PetDynamicHomeComponent {
  patientHeader: any;
  visit_no: any;
  headerDetail: any;
  aptObj: aptModel | undefined;
  currentHeading = '';
  vetMetaData = [];
  constructor(
    private docService: DocConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (history.state && history.state) {
      this.visit_no = history.state.visit_no;
      this.currentHeading = history.state.heading;
      this.aptObj = history.state.aptObj;
    }
    this.patientHeader = JSON.parse(localStorage.getItem('header')!);
    this.getPetMetaData();
  }
  gotoConsultHome() {
    this.router.navigate(['/pet-consultation-home'], { state: this.aptObj });
  }
  getPetMetaData() {
    if (this.visit_no) {
      this.docService
        .getPetMetaData(
          this.patientHeader.patient_id,
          this.visit_no,
          this.currentHeading
        )
        .subscribe((data) => {
          this.vetMetaData = data.results;
        });
    }
  }
}
